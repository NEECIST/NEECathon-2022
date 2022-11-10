import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import { FaCartArrowDown, FaBoxOpen, FaClipboardList} from 'react-icons/fa';



const styles = {
  card: {
    borderRadius: 10,
    padding: "1rem",
    width: "40vh",
    backgroundColor: "#1E1D25",
    boxShadow: "0px 6px 5px 0px rgba(0, 0, 0, 0.37)",
  },
  cardImage: {
    objectFit: "contain",
    height: "20vh",
    backgroundColor: "white",
    borderRadius: "20px",
    
  },
  title: {
    color: "#FFFFFF"
  }
};

function ShopItem(props) {
  return (
    <Card className="flex-fill mx-2 mb-3" style={styles.card}>
      <Card.Img variant="top" src={props.img} style={styles.cardImage} />
      <Card.Body>
        <Card.Title style={styles.title}>{props.title}</Card.Title>
      </Card.Body>
      {/* uncomment this container e o botao fica pequeno */}
      {/* <Container >  */}

      <ListGroup horizontal className=" border-0 justify-space-betwen">
        <Card.Text style={{color: "#FFFFFF"}}>
        <img alt="" style={{ lineHeight: "0", height: "1rem" }} src="https://cdn.discordapp.com/attachments/866354544544055346/914201994342850590/Asset_10.svg" />
          {" " + props.price + " NEECoins"}
        </Card.Text>

        <Card.Text style={{color: "#FFFFFF"}}>
            <FaBoxOpen style={{color:"#F8C535"}}/> {props.stock} pc
        </Card.Text>
      </ListGroup>

      <Button className="mb-2" variant="primary" style={{width: "fit-content", borderColor: "#1BE8BB", backgroundColor: "transparent"}} onClick={() => props.action(props.id)}>
        <Card.Text style={{color: "#1BE8BB"}}>
            <FaCartArrowDown/> Adicionar ao carrinho
        </Card.Text>
      </Button>
      {/* </Container> */}
      
      <Button variant="secondary" style={{borderColor: "#FFB7FF", backgroundColor: "transparent"}} as="a" href={props.datasheet} target="_blank">
        <Card.Text style={{color: "#FFB7FF"}}>
            <FaClipboardList/> Datasheet
        </Card.Text>
      </Button>
    </Card>
  )
  
  ;
}
export default ShopItem;
