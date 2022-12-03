import React, { useRef, useEffect, useState } from "react";
import Gallery from "./gallery";
import Schedule from "./Schedule";
import { HiUserGroup } from "react-icons/hi";
import { GrGallery } from "react-icons/gr";
import { BiTimeFive } from "react-icons/bi";
import supabaseClient from "../utils/supabaseClient";
import { Navigate, useLocation } from "react-router-dom";

import ProfileServices from "../core/ProfileServices";

function Home() {
  let location = useLocation();
  const part1 = useRef(null);
  const part2 = useRef(null);
  const part3 = useRef(null);
  const part4 = useRef(null);
  const part5 = useRef(null);
  const part6 = useRef(null);
  const part7 = useRef(null);
  const [animationsLive, setAnimationsLive] = useState(true);

  const home = useRef(null);

  const [teams, setTeams] = useState([]);

  function isVisible(ele) {
    const { top, bottom } = ele.getBoundingClientRect();
    const vHeight = window.innerHeight || document.documentElement.clientHeight;

    return (top > 0 || bottom > 0) && top < vHeight;
  }

  function animate(part) {
    if (isVisible(part.current)) {
      part.current.classList.add("fade-in-bck");
      part.current.classList.remove("inv");
    }
  }
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const handleScroll = (event) => {
    animate(part1);
    animate(part2);
    animate(part3);
    animate(part4);
    animate(part5);
    animate(part6);
    animate(part7);
  };

  async function intial() {
    animate(part1);
    animate(part2);
    await timeout(250);
    animate(part3);
    await timeout(250);
    animate(part4);
    await timeout(250);
    animate(part5);
    await timeout(250);
    animate(part6);
    await timeout(250);
    animate(part7);
    await timeout(250);
  }

  useEffect(() => {
    if (supabaseClient.auth.user() !== null) intial();
    ProfileServices.getTeams(setTeams);
    return () => {
      setAnimationsLive(false);
    };
  }, []);

  if (supabaseClient.auth.user() === null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <div className="mainContainer" onScroll={handleScroll} ref={home}>
      <div ref={part1} className="inv" style={{ display: "flex" }}>
        <div style={{ display: "flex", width: "100%", paddingLeft: "12vw" }}>
          <div className="linePart1">
            <div className="topLine"></div>
            <div className="iconBoxes">
              <div className="iconSpan"></div>
              <HiUserGroup size={29} />
              <div className="iconSpan"></div>
            </div>
            <div className="bottomLine"></div>
          </div>
          <div style={{ flex: "20", display: "flex", flexDirection: "column", paddingTop: "8vh" }}>
            <h2 style={{}}>As Equipas Desta Edição:</h2>
            <div className="teamsGrid">
              {teams.map((team) => {
                if (team.IDTEAM !== 1 && team.IDTEAM !== 0)
                  return (
                    <a href={`/profile/${team.NAME}`} key={team.IDTEAM} className="teamButton">
                      {team.NAME}
                    </a>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
      <div ref={part2} className="inv" style={{ display: "flex" }}>
        <div style={{ display: "flex", width: "100%", paddingLeft: "12vw" }}>
          <div className="extender">
            <div className="line"></div>
          </div>
        </div>
      </div>
      <div ref={part3} className="inv" style={{ display: "flex" }}>
        <div style={{ display: "flex", width: "100%", paddingLeft: "12vw" }}>
          <div className="linePart2">
            <div className="topLine"></div>
            <div className="iconBoxes">
              <div className="iconSpan"></div>
              <GrGallery size={29} />
              <div className="iconSpan"></div>
            </div>
            <div className="bottomLine"></div>
          </div>
          <div style={{ flex: "20", display: "flex", flexDirection: "column", paddingBottom: "3vh" }}>
            <h2 style={{}}>A Galeria do Evento:</h2>
            <h4>(Serão colocadas fotos ao longo do evento por aqui. Fica atento!)</h4>
          </div>
        </div>
      </div>
      <div ref={part4} className="galleryBox inv">
        <Gallery home={home} />
      </div>
      <div ref={part5} className="inv" style={{ display: "flex" }}>
        <div style={{ display: "flex", width: "100%", paddingLeft: "12vw" }}>
          <div className="extender">
            <div className="line"></div>
          </div>
        </div>
      </div>
      <div ref={part6} className="inv" style={{ display: "flex" }}>
        <div style={{ display: "flex", width: "100%", paddingLeft: "12vw" }}>
          <div className="extender">
            <div className="line"></div>
          </div>
        </div>
      </div>
      <div ref={part7} className="inv" style={{ display: "flex" }}>
        <div style={{ display: "flex", width: "100%", paddingLeft: "12vw" }}>
          <div className="linePart3">
            <div className="topLine"></div>
            <div className="iconBoxes">
              <div className="iconSpan"></div>
              <BiTimeFive size={29} />
              <div className="iconSpan"></div>
            </div>
            <div className="bottomLine"></div>
          </div>
          <div className="schedule" style={{ flex: "20", display: "flex", flexDirection: "column", paddingBottom: "80px" }}>
            <h2 style={{ marginBottom: "2vh" }}>O Horário do Evento:</h2>
            <Schedule />
          </div>
        </div>
      </div>
    </div>

    // <Container className="mt-2" fluid>
    //     <Row style={{justifyContent: "space-between", alignItems:"center"}}>
    //         <Col style={{maxWidth: "35vw"}}>
    //         </Col>

    //     <Col className="scheduleCol">
    //     <Card style={{backgroundColor: "#1e1d25"}}>
    //             <Card.Body>
    //                 <Schedule/>
    //             </Card.Body>
    //         </Card>

    //     </Col>
    //     </Row>
    // </Container>
  );
}
export default Home;
