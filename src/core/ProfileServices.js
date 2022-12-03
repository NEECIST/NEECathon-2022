import supabaseClient from "../utils/supabaseClient";
import axios from "axios";

const ProfileServices = {
  getPerson: async function (setAdmin) {
    try {
      let { data, error, status } = await supabaseClient.from("Persons").select(`*`);

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        if (data.length !== 1) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  },
  getTeam: async function (setTeam) {
    try {
      const { data, error } = await supabaseClient.rpc("get_user_team_object");

      if (error) {
        throw error;
      }
      if (data) {
        setTeam(data);
      }
    } catch (error) {
      alert(error.message);
    }
  },

  getTeams: async function (setTeams) {
    try {
      let { data, error, status } = await supabaseClient.from("Teams").select(`*`);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        data.sort((a, b) => a.IDTEAM - b.IDTEAM);
        setTeams(data);
      }
    } catch (error) {
      alert(error.message);
    }
  },

  getOthersTeam: async function (setTeam, team_name) {
    console.log(team_name);
    try {
      let { data, error, status } = await supabaseClient.rpc("get_other_team", { team_name: team_name });

      if (error && status !== 406) {
        throw error;
      }
      setTeam(data);
    } catch (error) {
      alert(error.message);
    }
  },

  getTeamMembers: async function (setTeamMembers) {
    try {
      let { data, error, status } = await supabaseClient.rpc("get_team_members");

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        console.log(data);
        setTeamMembers(data);
      }
    } catch (error) {
      alert(error.message);
    }
  },
  getOthersTeamMembers: async function (setTeamMembers, team_name) {
    try {
      let { data, error, status } = await supabaseClient.rpc("get_other_team_members", { team_name: team_name });

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        let data1 = []
        data.forEach(element => {
          data1.push({ name: element });
        });
        console.log(data1);
        setTeamMembers(data1);
      }
    } catch (error) {
      alert(error.message);
    }
  },

  getTeamComponents: async function (setComponents) {
    try {
      let { data, error, status } = await supabaseClient.from("Components|Team").select(`*`);

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        data.sort((a, b) => {
          return a.IDCOMPONENT - b.IDCOMPONENT;
        });
        var array = [];
        var prevID = -1;
        for (const component of data) {
          if (prevID === component.IDCOMPONENT) {
            array[array.length - 1].QUANTITY += component.QUANTITY;
          } else {
            var item = { QUANTITY: component.QUANTITY };
            try {
              let { data, error, status } = await supabaseClient.from("Components").select(`*`).eq("IDCOMPONENT", component.IDCOMPONENT);

              if (error && status !== 406) {
                throw error;
              }
              if (data) {
                item.NAME = data[0].NAME;
                item.REFSHEET = data[0].REFSHEET;
                item.IMAGE = data[0].IMAGE;
                array.push(item);
              }
            } catch (error) {
              alert(error.message);
            }
            prevID = component.IDCOMPONENT;
          }
        }
        setComponents(array);
      }
    } catch (error) {
      alert(error.message);
    }
  },

  getOthersTeamComponents: async function (setComponents, team_name) {
    try {
      let { data, error, status } = await supabaseClient.rpc("get_other_team_components", { team_name: team_name });

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        console.log(data);
        data.sort((a, b) => {
          return a.IDCOMPONENT - b.IDCOMPONENT;
        });
        var array = [];
        var prevID = -1;
        for (const component of data) {
          if (prevID === component.IDCOMPONENT) {
            array[array.length - 1].QUANTITY += component.QUANTITY;
          } else {
            var item = { QUANTITY: component.QUANTITY };
            try {
              let { data, error, status } = await supabaseClient.from("Components").select(`*`).eq("IDCOMPONENT", component.IDCOMPONENT);

              if (error && status !== 406) {
                throw error;
              }
              if (data) {
                item.NAME = data[0].NAME;
                item.REFSHEET = data[0].REFSHEET;
                item.IMAGE = data[0].IMAGE;
                array.push(item);
              }
            } catch (error) {
              alert(error.message);
            }
            prevID = component.IDCOMPONENT;
          }
        }
        console.log(array);
        setComponents(array);
      }
    } catch (error) {
      alert(error.message);
    }
  },
  getAllComponents: async function (setAllComponents) {
    try {
      let { data, error, status } = await supabaseClient.from("Components|Team").select(`*`);

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        data.sort((a, b) => {
          return a.IDTEAM - b.IDTEAM;
        });

        var prevTeamID = 0;
        var componentsByTeam = [];
        var team = [];
        data.forEach((component) => {
          if (prevTeamID === 0) {
            team = [];
            team.push(component);
            prevTeamID = component.IDTEAM;
          } else if (prevTeamID === component.IDTEAM) {
            team.push(component);
          } else if (prevTeamID !== component.IDTEAM) {
            prevTeamID = component.IDTEAM;
            componentsByTeam.push(team);
            team = [];
          }
        });
        componentsByTeam.push(team);
        console.log(componentsByTeam);
        var final = [];
        componentsByTeam.map(async (team) => {
          if (team.length > 0) {
            team.sort((a, b) => {
              return a.IDCOMPONENT - b.IDCOMPONENT;
            });
            var prevID = -1;
            var array = [];
            for (const component of team) {
              if (prevID === component.IDCOMPONENT) {
                array[array.length - 1].QUANTITY += component.QUANTITY;
              } else {
                var item = { QUANTITY: component.QUANTITY };
                try {
                  let { data, error, status } = await supabaseClient.from("Components").select(`*`).eq("IDCOMPONENT", component.IDCOMPONENT);

                  if (error && status !== 406) {
                    throw error;
                  }
                  if (data) {
                    item.NAME = data[0].NAME;
                    item.IDTEAM = component.IDTEAM;
                    item.REFSHEET = data[0].REFSHEET;
                    item.IMAGE = data[0].IMAGE;
                    array.push(item);
                  }
                } catch (error) {
                  alert(error.message);
                }
                prevID = component.IDCOMPONENT;
              }
            }
            console.log(array);
            final.push(array);
          }
        });
        setAllComponents(final);
      }
    } catch (error) {
      alert(error.message);
    }
  },

  changeProject: function (title, description, imageURL, setModal) {
    axios
      .post("http://backend.neecathon22.xyz/changeProject", {
        token: supabaseClient.auth.currentSession.access_token,
        imageURL: imageURL,
        title: title,
        description: description,
      })
      .then(function (response) {
        setModal(false);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  },
  transferCoins: function (teamGivingId, teamRecievingId, Amount) {
    if (Amount.length) {
      axios
        .post("http://backend.neecathon22.xyz/transferCoins", {
          token: supabaseClient.auth.currentSession.access_token,
          minusTeam: teamGivingId,
          plusTeam: teamRecievingId,
          value: Amount,
        })
        .then(function (response) { })
        .catch(function (error) {
          console.log(error.response);
        });
    }
  },
};

export default ProfileServices;
