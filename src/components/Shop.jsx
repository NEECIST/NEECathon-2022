import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Button, ListGroup, Badge, Offcanvas, Modal } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import searchIcon from "../images/magnifying-glass-solid.svg";
import ShopItem from "./ShopItem";
import supabaseClient from "../utils/supabaseClient";
import { Navigate, useLocation } from "react-router-dom";
import StoreService from "../core/StoreServices";

function Shop() {
  let location = useLocation();
  const [items, setItems] = useState(undefined);
  const [full_list, setFullList] = useState(undefined);
  const [cart, setCart] = useState([]);
  const [totalCash, setTotalCash] = useState(0.0);
  const [totalItems, setTotalItems] = useState(0.0);
  const [money, setMoney] = useState(0);

  //For the shopping list overlay
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    StoreService.getComponents(setItems);
    StoreService.getComponents(setFullList);
    StoreService.getTeamMoney(setMoney);
  }, []);

  function clearList() {
    setTotalCash(0);
    setTotalItems(0);
    const newcart = [];
    setCart(newcart);
  }

  function findElement(id) {
    let element = undefined;
    //Find the item in items array
    for (let index = 0; index < items.length; index++) {
      element = items[index];
      if (element.IDCOMPONENT === id) {
        return element;
      }
    }
    return undefined;
  }

  function handleDelete(id) {
    let element = findElement(id);
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        if (cart[i].quantity === 1) {
          const newcart = [...cart];
          newcart.splice(i, 1);
          setCart(newcart);
        } else {
          const newcart = [...cart];
          newcart[i].quantity -= 1;
          setCart(newcart);
        }
        setTotalCash(totalCash - parseFloat(element.PRICE));
        setTotalItems(totalItems - 1);
        break;
      }
    }
  }
  function buyItems() {
    if (totalCash > money) {
      setModalText("Woohoo, não tens dinheiro suficiente para comprar os componentes! ");
    } else {
      StoreService.buyComponents(cart, setModalText);
      setMoney(money - totalCash);
      clearList();
    }
    setModal(true);
  }
  function handleRequestComponent() {
    setModalText(
      <div>
        <h3>Requisitar Componentes</h3>
        <form style={{ display: "flex", flexWrap: "warp", flexDirection: "column" }}>
          <label>Nome do component:</label>
          <input type="text" id="componentname" name="componentname" />
          <br />
          <label>Link para compra:</label>
          <input type="text" id="componentlink" name="componentlink" />
          <br />
          <label>Quantidade:</label>
          <input type="text" id="componentquantity" name="componentquantity" />
          <br />
          <Button
            className="mt-1 "
            variant="success"
            onClick={() =>
              StoreService.requestComponent(
                document.getElementById("componentname").value,
                document.getElementById("componentlink").value,
                document.getElementById("componentquantity").value,
                setModalText
              )
            }
          >
            Requisitar
          </Button>
        </form>
      </div>
    );
    setModal(true);
  }
  function handleBuy(id) {
    let element = findElement(id);

    if (element === undefined) {
      return;
    }

    if (cart.length === 0) {
      setCart((prevCart) => [...prevCart, { id: id, quantity: 1 }]);
      setTotalCash(totalCash + parseFloat(element.PRICE));
      setTotalItems(totalItems + 1);
    } else {
      let found = 0;
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
          const newcart = [...cart];
          newcart[i].quantity += 1;
          setCart(newcart);
          setTotalCash(totalCash + parseFloat(element.PRICE));
          setTotalItems(totalItems + 1);
          found = 1;
          break;
        }
      }
      if (found === 0) {
        setCart((prevCart) => [...prevCart, { id: id, quantity: 1 }]);
        setTotalCash(totalCash + parseFloat(element.PRICE));
        setTotalItems(totalItems + 1);
      }
    }
  }

  function filter_search() {
    //Make new copy of items
    let newItems = [];
    //Get the value of the search bar
    let search = document.getElementById("search").value;
    //If the search bar is empty, return all items
    if (search === "") {
      setItems(full_list);
      return;
    } else {
      full_list.forEach((element) => {
        if (element.NAME.toLowerCase().includes(search.toLowerCase())) {
          newItems.push(element);
        }
      });
      setItems(newItems);
    }
  }

  function filter_selects() {
    //Make new copy of items
    let newItems = [];
    //Get inputs from selects
    let sensor = document.getElementById("sensor").checked;
    let resistências = document.getElementById("resistências").checked;
    let leds = document.getElementById("leds").checked;
    let motores = document.getElementById("motores").checked;
    let microcontroladores = document.getElementById("micro-controladores").checked;
    let informática = document.getElementById("informática").checked;
    let barramentos = document.getElementById("barramentos").checked;
    let fios = document.getElementById("fios").checked;
    let display = document.getElementById("display").checked;
    let rfid = document.getElementById("rfid").checked;
    let camara = document.getElementById("camara").checked;
    let botoes = document.getElementById("botões").checked;
    let relés = document.getElementById("relés").checked;
    let condensadores = document.getElementById("condensadores").checked;
    let diodos = document.getElementById("diodos").checked;
    let kits = document.getElementById("kits").checked;
    let indicadores = document.getElementById("indicadores").checked;
    let pilhas = document.getElementById("pilhas").checked;
    let ics = document.getElementById("ics").checked;
    let transístores = document.getElementById("transístores").checked;
    let breadboards = document.getElementById("breadboards").checked;
    let interruptores = document.getElementById("interruptores").checked;

    full_list.forEach((item) => {
      if (sensor && item.CATEGORY === "sensor") {
        newItems.push(item);
      }
      if (resistências && item.CATEGORY === "resistências") {
        newItems.push(item);
      }
      if (leds && item.CATEGORY === "leds") {
        newItems.push(item);
      }
      if (motores && item.CATEGORY === "motores") {
        newItems.push(item);
      }
      if (microcontroladores && item.CATEGORY === "micro-controladores") {
        newItems.push(item);
      }
      if (informática && item.CATEGORY === "informática") {
        newItems.push(item);
      }
      if (barramentos && item.CATEGORY === "barramentos") {
        newItems.push(item);
      }
      if (fios && item.CATEGORY === "fios") {
        newItems.push(item);
      }
      if (display && item.CATEGORY === "display") {
        newItems.push(item);
      }
      if (rfid && item.CATEGORY === "rfid") {
        newItems.push(item);
      }
      if (camara && item.CATEGORY === "camara") {
        newItems.push(item);
      }
      if (botoes && item.CATEGORY === "botões") {
        newItems.push(item);
      }
      if (relés && item.CATEGORY === "relés") {
        newItems.push(item);
      }
      if (condensadores && item.CATEGORY === "condensadores") {
        console.log(item);
        newItems.push(item);
      }
      if (diodos && item.CATEGORY === "diodos") {
        newItems.push(item);
      }
      if (kits && item.CATEGORY === "kits") {
        newItems.push(item);
      }
      if (indicadores && item.CATEGORY === "indicadores") {
        newItems.push(item);
      }
      if (pilhas && item.CATEGORY === "pilhas") {
        newItems.push(item);
      }
      if (ics && item.CATEGORY === "ics") {
        newItems.push(item);
      }
      if (transístores && item.CATEGORY === "transístores") {
        newItems.push(item);
      }
      if (breadboards && item.CATEGORY === "breadboards") {
        newItems.push(item);
      }
      if (interruptores && item.CATEGORY === "interruptores") {
        newItems.push(item);
      }
    });
    if (
      !(
        sensor ||
        resistências ||
        leds ||
        motores ||
        microcontroladores ||
        informática ||
        barramentos ||
        fios ||
        display ||
        rfid ||
        camara ||
        botoes ||
        relés ||
        condensadores ||
        diodos ||
        kits ||
        indicadores ||
        pilhas ||
        ics ||
        transístores ||
        breadboards ||
        interruptores
      )
    ) {
      setItems(full_list);
    } else {
      setItems(newItems);
    }
  }

  var filters = [
    "sensor",
    "resistências",
    "leds",
    "motores",
    "micro-controladores",
    "informática",
    "barramentos",
    "fios",
    "display",
    "rfid",
    "camara",
    "botões",
    "relés",
    "condensadores",
    "diodos",
    "kits",
    "indicadores",
    "pilhas",
    "ics",
    "transístores",
    "breadboards",
    "interruptores",
  ];

  if (supabaseClient.auth.user() === null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (items === undefined) {
    return (
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <Spinner className="mt-3" animation="border" role="status">
              <span className="visually-hidden">A Carregar...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container fluid style={{ display: "flex" }}>
        <Modal
          show={modal}
          onHide={() => {
            setModalText("");
            setModal(false);
          }}
        >
          <Modal.Body style={{ color: "white" }}>{modalText}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                setModalText("");
                setModal(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>{" "}
          {/* display: "flex", flex-direction: "column", align-items: "flex-start", */}
        </Modal>
        <div style={{ flex: 1, backgroundColor: "transperent", padding: "1vw 2vw 1vw 2vw", height: "calc(100vh - 68px - 43px)" }}>
          <div className="shopSideCard">
            <div className="shopBudget">
              <img alt="" className="shopCoinIcon" src="https://cdn.discordapp.com/attachments/866354544544055346/914201994342850590/Asset_10.svg" />
              <div style={{ paddingRight: "0.5rem" }}>Budget:</div>
              <div>{money !== undefined ? money : 0}</div>
            </div>

            <div className="searchBar">
              <img src={searchIcon} className="searchIcon" alt="search" />
              <input className="searchInput" type="text" placeholder="Procurar" id="search" onChange={filter_search} />
            </div>

            <div style={{ flex: 7, overflow: "auto" }}>
              {/* Categorias / Filtro*/}
              <h4>Categorias:</h4>
              {filters.map((filter) => {
                return (
                  <label class="b-contain">
                    <span>{filter}</span>
                    <input type="checkbox" onChange={filter_selects} id={filter} />
                    <div class="b-input"></div>
                  </label>
                  // <div className="shopFilter">
                  //   <input className="filterBox" type="checkbox" id={filter} onChange={filter_selects} />
                  //   <label className="filterLabel" for={filter}>
                  //     {filter}
                  //   </label>
                  // </div>
                );
              })}
            </div>

            <div className="horizontalLine"></div>

            <div className="shopButtons">
              {/* Pedir componentes*/}
              {/* Carrinho*/}
              <button className="cart btn btn-outline-light" onClick={handleShow}>
                <FaShoppingCart className="me-2" />
                <Badge pill bg="secondary">
                  {totalItems}
                </Badge>
              </button>
            </div>

            {/* OFFCANVAS that shows the shopping list */}
            <Offcanvas show={show} onHide={handleClose} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title as="h3">Lista de Compras</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Row>
                  <ListGroup>
                    {/* The cart only contains the ID and the quantity of the product with that ID */}
                    {cart === undefined
                      ? null
                      : cart.map(function (item, index) {
                          let element = findElement(item.id);
                          return (
                            <ListGroup.Item key={index}>
                              <Row>
                                <Col className="my-auto"> {element.NAME} </Col>
                                {/* no ideia why mas className="text-end" nao funciona, mas text-center ja funciona */}
                                <Col className="my-auto" style={{ textAlign: "right" }}>
                                  <Button className="mx-1" variant="danger" onClick={() => handleDelete(element.IDCOMPONENT)}>
                                    -
                                  </Button>
                                  <Badge bg="secondary" pill>
                                    {item.quantity}
                                  </Badge>
                                  <Button className="mx-1" variant="primary" onClick={() => handleBuy(element.IDCOMPONENT)}>
                                    +
                                  </Button>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          );
                        })}
                  </ListGroup>
                </Row>
              </Offcanvas.Body>
              <Container>
                <Row as="h4">
                  <Col className="mt-2">
                    {" "}
                    Total: {Math.abs(totalCash)}{" "}
                    <img alt="" style={{ lineHeight: "0", height: "1rem" }} src="https://cdn.discordapp.com/attachments/866354544544055346/914201994342850590/Asset_10.svg" />
                  </Col>
                  {cart.length !== 0 ? (
                    <Col style={{ textAlign: "right" }}>
                      <Button className="mt-2 me-2" variant="danger" onClick={() => clearList()}>
                        {" "}
                        Limpar Carro{" "}
                      </Button>
                      <Button className="mt-2" variant="primary" onClick={() => buyItems()}>
                        Comprar
                      </Button>
                    </Col>
                  ) : null}
                </Row>
              </Container>
            </Offcanvas>
          </div>
        </div>
        <div
          style={{
            flex: "3",
            display: "flex",
            flexWrap: "wrap",
            flexFirection: "row",
            paddingBlock: "2vh 3vh",
            height: "calc(100vh - 68px - 43px)",
            marginBottom: "43px",
            overflow: "auto",
            justifyContent: "flex-start",
          }}
        >
          {items.map((item, index) => (
            <ShopItem key={index} title={item.NAME} img={item.IMAGE} price={item.PRICE} id={item.IDCOMPONENT} action={handleBuy} stock={item.STOCK} datasheet={item.REFSHEET} />
          ))}
        </div>
      </Container>
    );
  }
}
export default Shop;
