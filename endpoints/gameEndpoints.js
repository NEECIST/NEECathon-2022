import { supabase } from '../settings.js'
import * as functions from '../functions/functions.js'

var potID = 0;
var BOARD_SIZE = 24;
var Deck = [];


/**
 * Add coins to a Team
 * 
 * @param {number} teamID id of the team
 * @param {number} cash ammount of cash to add
 * @return void
 */
export async function teamAddCoins(teamID, cash) {
  var Team = await functions.getTeam(teamID);

  functions.addCoins(Team, cash)
}


/**
 * Remove coins from a Team
 * 
 * @param {number} teamID id of the team
 * @param {number} cash ammount of cash to remove
 * @return {boolean} true if succesfull
 */
export async function teamSubtractCoins(teamID, cash) {
  var Team = await functions.getTeam(teamID);

  return functions.subtractCoins(Team, cash)
}


/**
 * Set coins of a Team
 * 
 * @param {number} teamID id of the giver team
 * @param {number} cash ammount of cash to set
 * @return void
 */
export async function setCoinsTeam(teamID, cash) {
  var Team = await functions.getTeam(teamID);

  functions.setCoins(Team, cash)
}


/**
 * Throw dices an move Team
 * 
 * @param {number} teamID id of the team
 * @return void
 */
export async function throwDices(teamID){

  if(typeof teamID==='undefined' ||teamID < 0){
    return;
  }
  var Teams = await functions.getTeam(teamID);

  if(typeof Teams!=='undefined'){
    var dices=[];
    dices.push(functions.getRandomInt(1,7))
    dices.push(functions.getRandomInt(1,7))
    /*if(dices[0]===dices[1]){
      dices.push(functions.getRandomInt(1,7))
      dices.push(functions.getRandomInt(1,7))
      if(dices[2]===dices[3]){
        dices.push(functions.getRandomInt(1,7))
        dices.push(functions.getRandomInt(1,7))
        if(dices[4]===dices[5]){
          var house = 10;
          const { updated, update_error } = await supabase
          .from('Teams')
          .update({ HOUSE: house })
          .eq('IDTEAM', teamID)
          return; //NOTE DEPRECATED doubles
        }
      }
    }*/
    var house = (Teams.HOUSE + dices.reduce((a,b) => a+b, 0)) >= BOARD_SIZE ? (Teams.HOUSE + dices.reduce((a,b) => a+b, 0))-BOARD_SIZE : Teams.HOUSE + dices.reduce((a,b) => a+b, 0)
    console.log('throwDices:'+house)
    const { updated, update_error } = await supabase
    .from('Teams')
    .update({ HOUSE: house })
    .eq('IDTEAM', teamID)
    //FIXME tamanho do tabuleiro e os updates saem undefined?
  }
}


/**
 * Transfer coins between Teams
 * 
 * @param {number} minusTeam id of the giver team
 * @param {number} plusTeam id of the reciever team
 * @param {number} cash ammount of cash to be transfered
 * @return void
 */
export async function transferCoins(minusTeam,plusTeam,cash){
  if(typeof minusTeam==='undefined' || typeof plusTeam==='undefined' || typeof cash==='undefined' || minusTeam < 0 || plusTeam < 0 || cash < 0){
    return;
  }

  var Teams = await functions.getTeams([minusTeam, plusTeam]);

  if(typeof Teams!=='undefined' && Teams.length){
    var MTeam = (Teams[0].IDTEAM===minusTeam) ? Teams[0] : Teams[1];
    var PTeam = (Teams[0].IDTEAM===plusTeam) ? Teams[0] : Teams[1];

    if(await functions.subtractCoins(MTeam, cash)){
      functions.addCoins(PTeam, cash);
      const { insert, insert_error } = await supabase  //NOTE verificar se da erro
      .from('Team|Team')
      .insert([
        { IDTEAM1: minusTeam, IDTEAM2: plusTeam, CASH: cash, LogTime: functions.logTime() },
      ])
    }
  }
}


/**
 * Buy a Patent
 * 
 * @param {number} teamID id of the team
 * @param {number} houseID id of the house
 * @return void
 */
export async function buyPatent(teamID,houseID){
  if(typeof teamID==='undefined' || typeof houseID==='undefined' || teamID < 0 || houseID < 0){
    return;
  }
  var Teams = await functions.getTeam(teamID);
  var House = await functions.getHouse(houseID);

  if(House.IDTEAM===null){
    if(typeof House!=='undefined' && typeof Teams!=='undefined' && House.TYPE==="house"){
      if (await functions.subtractCoins(Teams,House.PRICE)) {
        const { updated, update_error } = await supabase  //NOTE verificar se da erro
          .from('Houses')
          .update({ IDTEAM: teamID })
          .eq('IDHOUSE', houseID)
        
        const { insert, insert_error } = await supabase  //NOTE verificar se da erro
          .from('Houses|Team')
          .insert([
            { IDHOUSE: houseID, IDTEAM: teamID, LogTime: functions.logTime() },
          ])
      }
    }
  }else{
    console.log("Patent already bought");
  }
}


/**
 * Transfer money from a Team to the Pot
 * 
 * @param {number} teamID id of the team
 * @param {number} cash ammount of cash to be transfered
 * @return void
 */
export async function increasePot(teamID,cash){
  var Teams = await functions.getTeams([teamID, potID]);

  if(typeof Teams!=='undefined' && Teams.length){
    var Team = (Teams[0].IDTEAM===teamID) ? Teams[0] : Teams[1];
    var Pot = (Teams[0].IDTEAM===potID) ? Teams[0] : Teams[1];

    if(await functions.subtractCoins(Team, cash)){
      functions.addCoins(Pot, cash)
    }else{
      //TODO se não tiver dinheiro  
    }
  }
}


/**
 * Recieve all the money in the pot
 * 
 * @param {number} teamID id of the team
 * @return void
 */
export async function receivePot(teamID){
  var Teams = await functions.getTeams([teamID, potID]);

  if(typeof Teams!=='undefined' && Teams.length){
    var Team = (Teams[0].IDTEAM===teamID) ? Teams[0] : Teams[1];
    var Pot = (Teams[0].IDTEAM===potID) ? Teams[0] : Teams[1];

    if(functions.addCoins(Team, Pot.CASH)){
      functions.setCoins(Pot, 0)
    }else{
      //TODO se não tiver dinheiro  
    }
  }
}


/**
 * Add a player to a team
 * 
 * @param {number} personID id of the person
 * @param {number} teamID id of the team
 * @return void
 */
export async function addPlayer2Team(personID, teamID){
  if(typeof personID==='undefined' || typeof teamID==='undefined' || personID < 0 || teamID < 0){
    return;
  }

  var Person = await functions.getPerson(personID);
  var Team = await functions.getTeam(teamID)

  if(typeof Person!=='undefined' && typeof Team!=='undefined') {
    if(Person.IDTEAM ===null) {
      const { updated, update_error } = await supabase  //NOTE verificar se da erro
      .from('Persons')
      .update({ IDTEAM: teamID })
      .eq('IDPERSON', personID)
    }
  }
}


/**
 * Removes a player from a team
 * 
 * @param {number} personID id of the person to be removed
 * @return void
 */
export async function removePlayerFromTeam(personID){
  if(typeof personID==='undefined' || personID < 0){
    return;
  }

  var Person = await functions.getPerson(personID);

  if(typeof Person!=='undefined') {
    if(Person.IDTEAM !==null) {
      console.log("Removing...")
      const { updated, update_error } = await supabase  //NOTE verificar se da erro
      .from('Persons')
      .update({ IDTEAM: null })
      .eq('IDPERSON', personID)
    }
  }
}


/**
 * Updates the owner of a given house
 * 
 * @param {number} houseID id of the house
 * @param {number} finalTeamID id of the new owner of the house
 * @return void
 */
export async function transferPlayerFromTeam(personID, finalTeamID){
  if(typeof personID==='undefined' || typeof finalTeamID==='undefined' || personID < 0 || finalTeamID < 0){
    return;
  }

  var Person = await functions.getPerson(personID);
  var Team = await functions.getTeam(finalTeamID);

  if(typeof Person!=='undefined' && typeof Team!=='undefined') {
    if(Person.IDTEAM !==null) {
      const { updated, update_error } = await supabase  //NOTE verificar se da erro
      .from('Persons')
      .update({ IDTEAM: finalTeamID })
      .eq('IDPERSON', personID)
    }
  }
}


/**
 * Updates the owner of a given house
 * 
 * @param {number} houseID id of the house
 * @param {number} finalTeamID id of the new owner of the house
 * @return void
 */
export async function tradeHouse(houseID, finalTeamID){
  if(typeof houseID==='undefined' || typeof finalTeamID==='undefined' || houseID < 0 || finalTeamID < 0){
    return;
  }

  var Team = await functions.getTeam(finalTeamID);
  var House = await functions.getHouse(houseID);

  if (typeof House!=='undefined' && typeof Team!=='undefined' && House.TYPE==="house") {
    if (House.IDTEAM !== null) {
      const { updated, update_error } = await supabase  //NOTE verificar se da erro
      .from('Houses')
      .update({ IDTEAM: finalTeamID })
      .eq('IDHOUSE', houseID)
    }
  }

}


/**
 * Get all the cards and shuffles them
 * 
 * @return void
 */
export async function shuffleCards(){
  let { data: Cards, error } = await supabase    //NOTE verificar se da erro
  .from('SpecialCards')
  .select('*')

  while (Cards.length > 0) {
    var random = functions.getRandomInt(0, Cards.length);
    Deck.push(Cards.splice(random, 1));
  }
  console.log(Deck)
}


/**
 * Updates the stock of a given component
 * 
 * @param {number} component_id id of the component
 * @param {number} ammount the ammount of the stock
 * @return void
 */
export async function updateStock(component_id, ammount) {
  
  var stock = ammount

  let { error } = await supabase  //NOTE precisa de ser transaction
    .rpc('updatestock', {
      stock, 
      component_id
    })

  if (error) console.error(error)

}


/**
 * Buy all the components in a given cart
 * 
 * @param {number} teamID id of the team
 * @param cart list of components to buy
 * @return void
 */
export async function buyCart(teamID, cart) {

  var Team = await functions.getTeam(teamID);
  var Component = []
  var cost = 0;

  if (Team!==undefined) {                                       //NOTE usar locks ou transaction
    for (var i = 0; i < cart.length; i++) {
      Component.push(await functions.getComponent(cart[i].componentID))
      if (Component[i]===undefined || Component[i].STOCK < cart[i].ammount) {
        return false
      }
      cost += (Component[i].PRICE * cart[i].ammount);
    }
    if (cost > Team.CASH) return false

    for (var i = 0; i < cart.length; i++) {
      updateStock(Component[i].IDCOMPONENT, (Component[i].STOCK - cart[i].ammount))
      const { insert, insert_error } = await supabase  //NOTE verificar se da erro
      .from('Components|Team')
      .insert([
        { IDCOMPONENT: Component[i].IDCOMPONENT, IDTEAM: teamID, QUANTITY: cart[i].ammount, LogTime: functions.logTime() },
      ])
    }

    functions.subtractCoins(Team, cost)
  }
}