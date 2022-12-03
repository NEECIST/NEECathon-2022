import "./index.css";
import React from "react";
import MyNav from "./components/Navbar";
import Footer from "./components/Footer";
import { isMobile } from "react-device-detect";
import loading_icon from "./images/loading.svg";
import topimage from "./images/top_part.svg";
import bottomimage from "./images/bottom_part.svg";

export default function PageLayout(props) {
  
  if (isMobile) {
    return (
      <div
        style={{
          display: "flex",
          backgroundImage: 'url("./bg.png")',
          backgroundSize: "cover",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#121212",
          overflow: "clip",
        }}
      >
        <img className="waves top" src={topimage} alt="topimage" />
        <h2 style={{ textAlign: "center" }}>A NEECathon é tão grande que nem cabe no teu telemóvel!</h2>
        <h4>Abre este site no teu pc</h4>
        <img src={loading_icon} style={{ width: "80vw" }} alt="loading" />
        <img className="waves bottom" src={bottomimage} alt="topimage" />
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <MyNav active={props.active} />
        <div style={{ flexGrow: "1", backgroundColor: "#121212" }}>{props.children}</div>
        <Footer />
      </div>
    );
  }
}
