import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import { Nav, Navbar } from "react-bootstrap";
import neecathon_logo from "../images/logo.png";
import ProfileServices from "../core/ProfileServices";
import "../css/Navbar.css";
import supabaseClient from "../utils/supabaseClient";

export default function MyNav(props) {
  // //team[0].NAME
  const [team, setTeam] = useState(undefined);
  const teamName = useRef(null);
  const logout = useRef(null);

  function hover() {
    console.log("hover");
    logout.current.classList.remove("inv");
  }
  function unhover() {
    console.log("unhover");
    logout.current.classList.add("inv");
  }

  useEffect(() => {
    ProfileServices.getTeam(setTeam);
  }, []);
  if (team === undefined) {
    return (
      <div>
        <Navbar style={{ backgroundColor: "#09013b", display: "flex", zIndex: "1" }}>
          <div className="text-light ">
            <img src={neecathon_logo} alt="logo" className="navbarLogo" />
          </div>
          «
          <Nav>
            <Nav.Link className="text-light navbarOptions" href="/home" style={{ textDecoration: props.active === "Home" ? "underline #78ecd6" : "none" }}>
              Página Inicial
            </Nav.Link>
            <Nav.Link className="text-light navbarOptions" href="/shop" style={{ textDecoration: props.active === "Shop" ? "underline #78ecd6" : "none" }}>
              Loja
            </Nav.Link>
          </Nav>
          <Nav.Link ref={teamName} className="text-light navbarOptions team" style={{ textDecoration: props.active === "Profile" ? "underline #78ecd6" : "none" }} href="/profile">
            A Carregar...
          </Nav.Link>
        </Navbar>
        <div ref={logout} className="navbar-logout inv">
          Logout
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar style={{ backgroundColor: "#09013b", display: "flex", zIndex: "1" }}>
        <div className="text-light ">
          <img src={neecathon_logo} alt="logo" className="navbarLogo" />
        </div>
        <Nav>
          <Nav.Link className="text-light navbarOptions" href="/home" style={{ textDecoration: props.active === "Home" ? "underline #78ecd6" : "none" }}>
            Página Inicial
          </Nav.Link>
          <Nav.Link className="text-light navbarOptions" href="/shop" style={{ textDecoration: props.active === "Shop" ? "underline #78ecd6" : "none" }}>
            Loja
          </Nav.Link>
        </Nav>
        <Nav.Link
          ref={teamName}
          onMouseOver={hover}
          onMouseLeave={unhover}
          className="text-light navbarOptions team"
          style={{ textDecoration: props.active === "Profile" ? "underline #78ecd6" : "none" }}
          href="/profile"
        >
          {team[0].NAME}
        </Nav.Link>

        <div
          ref={logout}
          onMouseOver={hover}
          onMouseLeave={unhover}
          onClick={() => {
            supabaseClient.auth.signOut();
            window.location.href = "http://neecathon22.xyz/";
          }}
          className="navbar-logout inv"
        >
          Logout
        </div>

        {/* <Navbar.Collapse className="justify-content-end">
          <NavDropdown align="end" style={{ color: "#ffffff" }} title="Minha Equipa">
            <NavDropdown.Item href="/profile">{team[0].NAME}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => supabaseClient.auth.signOut()} href="http://neecathon22.midas-cloud.xyz/">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse> */}
      </Navbar>
    </div>
  );
}
