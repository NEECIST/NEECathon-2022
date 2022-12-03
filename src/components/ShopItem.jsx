import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import { FaCartArrowDown, FaBoxOpen, FaClipboardList } from "react-icons/fa";
import "../css/ShopItem.css";

const styles = {
  card: {},
  cardImage: {
    objectFit: "contain",
    height: "20vh",
    backgroundColor: "white",
    borderRadius: "20px",
  },
  title: {
    color: "#FFFFFF",
  },

  buttonStyle: {
    width: "fit-content",
    borderColor: "transparent",
    backgroundColor: "transparent",
    padding: "0.1rem",
  },
};

function ShopItem(props) {
  return (
    <Card className="flex-fill mx-2 mb-3 componentCard">
      <Card.Img className="componentImage" variant="top" src={props.img} />
      <div className="priceBlob">
        <div>{props.price}</div>
        <img alt="" style={{ lineHeight: "0", height: "1rem" }} src="https://cdn.discordapp.com/attachments/866354544544055346/914201994342850590/Asset_10.svg" />
      </div>
      <Card.Title style={styles.title}>{props.title}</Card.Title>
      {/* uncomment this container e o botao fica pequeno */}
      {/* <Container >  */}

      <ListGroup horizontal className=" border-0 justify-space-betwen">
        <Card.Text style={{ color: "#FFFFFF", fontSize: "1.2rem", paddingLeft: "4px" }}>
          <FaBoxOpen style={{ color: "#F8C535" }} /> {props.stock} pc em stock
        </Card.Text>
      </ListGroup>

      <Button variant="primary" style={styles.buttonStyle} onClick={() => props.action(props.id)}>
        <Card.Text style={{ color: "#1BE8BB", fontSize: "1.2rem" }}>
          <FaCartArrowDown /> Adicionar ao carrinho
        </Card.Text>
      </Button>
      {/* </Container> */}

      <Button variant="secondary" style={styles.buttonStyle} as="a" href={props.datasheet} target="_blank">
        <Card.Text style={{ color: "#FFB7FF", fontSize: "1.2rem" }}>
          <FaClipboardList /> Datasheet
        </Card.Text>
      </Button>
    </Card>
  );
}
export default ShopItem;
