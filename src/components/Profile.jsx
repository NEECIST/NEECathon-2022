import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, ListGroup, Popover, OverlayTrigger, Button, Modal, Form } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineArrowDown } from "react-icons/ai";
import supabaseClient from "../utils/supabaseClient";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { CSVDownload } from "react-csv";
import ProfileServices from "../core/ProfileServices";
import loading_icon from "../images/loading.svg";

function Profile() {
  let location = useLocation();
  const [team, setTeam] = useState(undefined);
  const [teams, setTeams] = useState(undefined);
  const [teamMembers, setTeamMembers] = useState(undefined);
  const [teamComponents, setTeamComponents] = useState(undefined);
  const [admin, setAdmin] = useState(false);
  const [allComponents, setAllComponents] = useState([]);

  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");

  let { id } = useParams();
  useEffect(() => {
    if (id !== undefined) {
      ProfileServices.getOthersTeam(setTeam, id);
      ProfileServices.getOthersTeamMembers(setTeamMembers, id);
      ProfileServices.getOthersTeamComponents(setTeamComponents, id);
      setAllComponents([1, 2]);
      setTeams({});
    } else {
      ProfileServices.getTeam(setTeam);
      ProfileServices.getPerson(setAdmin);
      ProfileServices.getTeamMembers(setTeamMembers);
      ProfileServices.getTeamComponents(setTeamComponents);
      ProfileServices.getAllComponents(setAllComponents);
      ProfileServices.getTeams(setTeams);
    }
  }, []);

  function componentsList() {
    var final = [];

    allComponents.forEach((Team) => {
      final.push([`Equipa ${Team[0].IDTEAM - 1}`, "Nome", "Quantidade"]);

      Team.forEach((component) => {
        final.push([" ", component.NAME.replaceAll("\n", " "), component.QUANTITY]);
      });
    });

    let csvContent = "data:text/csv;charset=UTF-8 with BOM," + final.map((e) => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
    <CSVDownload data={final} target="_blank" />;
  }

  function handlePictureChange() {
    setModalText(
      <div>
        <h3>Editar Perfil:</h3>
        <form style={{ display: "flex", flexWrap: "warp", flexDirection: "column" }}>
          <label style={{ color: "white" }}>Título de Projecto:</label>
          <input style={{ marginTop: "5px", marginBottom: "15px" }} type="text" id="title" name="title" placeholder="Título" />
          <label style={{ color: "white" }}>Descrição de Projecto:</label>
          <input style={{ marginTop: "5px", marginBottom: "15px" }} type="text" id="description" name="description" placeholder="Descrição" />
          <label style={{ marginTop: "5px", color: "white" }}>Para modificares a vossa imagem de perfil, coloca o link de uma imagem no campo abaixo:</label>
          <input type="text" id="imageurl" name="imageurl" placeholder="Imagem de Perfil" />
          <br />
          <Button className="mt-1 " variant="success" style={{ filter: "hue-rotate(16deg)" }} onClick={submitProjectChange}>
            Submeter
          </Button>
        </form>
      </div>
    );
    setModal(true);
  }

  function submitProjectChange() {
    let title = document.getElementById("title").value === "" ? team[0].PROJECT_TITLE : document.getElementById("title").value;
    let description = document.getElementById("description").value === "" ? team[0].PROJECT_DESCRIPTION : document.getElementById("description").value;
    let imageurl = document.getElementById("imageurl").value === "" ? team[0].IMAGE : document.getElementById("imageurl").value;
    ProfileServices.changeProject(title, description, imageurl, setModal);
  }
  if (supabaseClient.auth.user() === null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (team === undefined || teamMembers === undefined || teamComponents === undefined || allComponents.length < 0 || admin === undefined || teams === undefined) {
    return (
      <div style={{ display: "flex", width: "100vw", justifyContent: "center" }}>
        <img src={loading_icon} style={{ height: "43vh" }} alt="loading" />
      </div>
    );
  } else {
    console.log(teamComponents, allComponents);
    return (
      <Container fluid style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="modalFix">
          <Modal
            animation={true}
            show={modal}
            onHide={() => {
              setModalText("");
              setModal(false);
            }}
          >
            <Modal.Body>{modalText}</Modal.Body>
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
            </Modal.Footer>
          </Modal>
        </div>
        <h1 style={{ color: "white", textDecoration: "underline 1px #1CE8BB", height: "fit-content" }}>{team[0].NAME}</h1>
        <div className="linhas1">
          <img
            className="profilePicture"
            src={team[0].IMAGE === null ? "https://media.discordapp.net/attachments/866354544544055346/915249222079615006/blank-profile-picture-973460_640.png" : team[0].IMAGE}
          ></img>
          <div className="leftCard">
            <div className="projectCard">
              <div>
                <h3 className="projectTitle" id="oldTitle">
                  {team[0].PROJECT_TITLE}
                </h3>
                <hr style={{ height: "2px", color: "#f48ee5" }} />
                <p className="projectDescription" id="oldDescription">
                  {team[0].PROJECT_DESCRIPTION}
                </p>
              </div>
              {id == undefined ? (
                <button className="changeProject" onClick={handlePictureChange}>
                  Alterar Informações do Projecto
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div
          className="linhas2"
          style={{
            alignItems: "flex-start!important",
          }}
        >
          <div style={{ width: "45%" }}>
            <h3 className="teamTitle">Equipa</h3>
            <Card className="teamMembersCard">
              <ListGroup as="ul" variant="flush">
                {teamMembers === undefined
                  ? null
                  : teamMembers.map((member) => (
                      <ListGroup.Item key={member.name} as="li">
                        {member.name}
                      </ListGroup.Item>
                    ))}
              </ListGroup>
            </Card>
          </div>
          <div style={{ width: "45%" }}>
            <h3 className="projectTitle">Inventário</h3>
            <Card className="teamMembersCard">
              <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center">
                <h3 className="budgetTitle">Budget:</h3>
                <div style={{ display: "flex", alignItems: "center!important" }}>
                  <div style={{ paddingRight: "12px" }}>{team[0].CASH !== undefined ? team[0].CASH : 0}</div>
                  <img alt="" className="shopCoinIcon" src="https://cdn.discordapp.com/attachments/866354544544055346/914201994342850590/Asset_10.svg" />
                </div>
              </ListGroup.Item>
            </Card>
            <Card className="teamMembersCard">
              {teamComponents === undefined
                ? null
                : teamComponents.map((component) =>
                    !admin ? (
                      <ListGroup.Item key={component.NAME} as="li" className="d-flex justify-content-between align-items-start">
                        <div key={`${component.NAME}-div`} className="ms-2 me-auto">
                          <OverlayTrigger
                            trigger={["hover", "focus"]}
                            key={"bottom"}
                            placement={"bottom"}
                            overlay={
                              <Popover key={`${component.NAME}-overlay`} id={`popover-positioned-${"bottom"}`}>
                                <Popover.Header key={`${component.NAME}-overlay-header`} as="h3">
                                  Clica para aceder a datasheet
                                </Popover.Header>
                                <Popover.Body key={`${component.NAME}-overlay-body`}>
                                  <img key={component.IMAGE} alt="" style={{ maxWidth: "100%" }} src={component.IMAGE}></img>
                                </Popover.Body>
                              </Popover>
                            }
                          >
                            <a key={component.REFSHEET} href={component.REFSHEET} target="_blank" rel="noreferrer" style={{ color: "white" }}>
                              {component.NAME}
                            </a>
                          </OverlayTrigger>
                        </div>
                        <Badge key={component.NAME} variant="primary" pill>
                          {component.QUANTITY}
                        </Badge>
                      </ListGroup.Item>
                    ) : null
                  )}
              {allComponents === undefined
                ? null
                : allComponents.map((team) => [
                    admin ? (
                      <Card.Header key={team[0].IDTEAM} as="h5">
                        Inventário Equipa {team[0].IDTEAM - 1}:
                      </Card.Header>
                    ) : null,
                    admin
                      ? team.map((component) => (
                          <ListGroup.Item key={component.NAME} as="li" className="d-flex justify-content-between align-items-start">
                            <div key={`${component.NAME}-div`} className="ms-2 me-auto">
                              <OverlayTrigger
                                trigger={["hover", "focus"]}
                                key={"bottom"}
                                placement={"bottom"}
                                overlay={
                                  <Popover
                                    key={`${component.NAME}-overlay`}
                                    id={`popover-positioned-${"bottom"}`}
                                    style={{ backgroundColor: " rgb(9, 1, 59)", background: "linear-gradient(180deg, rgba(9, 1, 59, 1) 51%, rgba(54, 36, 98, 1) 100%)" }}
                                  >
                                    <Popover.Header key={`${component.NAME}-overlay-header`} as="h3" style={{ backgroundColor: "rgba(9, 1, 59, 1)!important" }}>
                                      Clica para aceder a datasheet
                                    </Popover.Header>
                                    <Popover.Body key={`${component.NAME}-overlay-body`}>
                                      <img key={component.IMAGE} alt="" style={{ maxWidth: "100%" }} src={component.IMAGE}></img>
                                    </Popover.Body>
                                  </Popover>
                                }
                              >
                                <a key={component.REFSHEET} href={component.REFSHEET} target="_blank" rel="noreferrer" style={{ color: "white" }}>
                                  {component.NAME}
                                </a>
                              </OverlayTrigger>
                            </div>
                            <Badge key={component.NAME} variant="primary" pill>
                              {component.QUANTITY}
                            </Badge>
                          </ListGroup.Item>
                        ))
                      : null,
                  ])}
            </Card>
          </div>
          {admin ? (
            <div className="adminTools">
              <Card.Text>
                <Button variant="warning" className="mx-2 " onClick={componentsList}>
                  Obter lista de componentes por equipa(CSV);
                </Button>
              </Card.Text>
              <Card.Text as={"div"}>
                <Form className="text-center">
                  <Form.Label>Transferir entre equipas</Form.Label>
                  <Form.Select id="teamGivingId" aria-label="Equipa a jogar">
                    {teams.flatMap((item) => {
                      //if( item.IDTEAM !== 1&&item.IDTEAM !==0){
                      if (item.IDTEAM !== 0) {
                        return (
                          <option key={item.NAME} value={item.IDTEAM}>
                            {item.NAME}
                          </option>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </Form.Select>
                  <Form.Group>
                    <AiOutlineArrowDown />
                  </Form.Group>

                  <Form.Select id="teamRecievingId" aria-label="Equipa a jogar">
                    {teams.flatMap((item) => {
                      //if( item.IDTEAM !== 1&&item.IDTEAM !==0){
                      if (item.IDTEAM !== 0) {
                        return (
                          <option key={item.NAME} value={item.IDTEAM}>
                            {item.NAME}
                          </option>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </Form.Select>
                  <Form.Group className="mt-2 mb-2" controlId="Amount">
                    <Form.Control type="number" placeholder="Amount" />
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="mx-2 "
                    onClick={() =>
                      ProfileServices.transferCoins(document.getElementById("teamGivingId").value, document.getElementById("teamRecievingId").value, document.getElementById("Amount").value)
                    }
                  >
                    Transferir NEECoins <img alt="" style={{ lineHeight: "0", height: "1rem" }} src="https://cdn.discordapp.com/attachments/866354544544055346/914201994342850590/Asset_10.svg" />
                  </Button>
                </Form>
                <a
                  href="/storeLogs"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "x-large",
                    paddingInline: "15px",
                    paddingBlock: "5px",
                    border: "2px solid white",
                    marginInline: "20%",
                    marginTop: "15px",
                    borderRadius: "15px",
                    textAlign: "center",
                  }}
                >
                  Store Logs
                </a>
              </Card.Text>
            </div>
          ) : null}
        </div>

        {/* <div style={{ backgroundColor: "transperent", padding: "1vw 2vw 1vw 2vw", height: "calc(100vh - 68px - 43px)" }}></div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            paddingBlock: "2vh 0vh",
            height: "calc(100vh - 68px - 43px)",
            overflow: "auto",
            justifyContent: "flex-start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", height: "100%", flex: "1", padding: "1rem", alignItems: "flex-start" }}></div>
        </div> */}
      </Container>
    );
  }
}
export default Profile;
