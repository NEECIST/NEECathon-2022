import "../index.css";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";
import powered_by_neec from "../images/powered_by_neec.svg";

export default function Footer() {
  return (
    <footer className="text-light" style={{ backgroundColor: "#09013b", boxShadow: "0 0 10px 0px #ffb7ff" }}>
      <Row className="align-items-center me-0" style={{ backgroundColor: "#212529" }}>
        <Col className="text-center pe-0">
          <a href="/parcerias" style={{ position: "absolute", bottom: "5px", left: "12px", textDecoration: "none", color: "white", fontSize: "x-large" }}>
            Parcerias
          </a>
          <SocialIcon className="m-1" target="_blank" fgColor="white" style={{ height: "35px", width: "35px" }} url="https://www.facebook.com/NEECIST/" />
          <SocialIcon className="m-1" target="_blank" bgColor="#FB2253" fgColor="white" style={{ height: "35px", width: "35px" }} url="https://www.instagram.com/neecist/" />
          <SocialIcon className="m-1" target="_blank" fgColor="white" style={{ height: "35px", width: "35px" }} url="https://www.linkedin.com/company/neecist/mycompany/" />
          <SocialIcon className="m-1" target="_blank" fgColor="white" style={{ height: "35px", width: "35px" }} url="https://www.youtube.com/user/NEECIST" />
          <SocialIcon className="m-1" target="_blank" fgColor="white" style={{ height: "35px", width: "35px" }} url="https://neecist.org/" />
          <img src={powered_by_neec} alt="logo" className="footerLogo" style={{ height: "35px", width: "auto", position: "absolute", bottom: "3px", right: "5px" }} />
        </Col>
      </Row>
      <div></div>
    </footer>
  );
}
