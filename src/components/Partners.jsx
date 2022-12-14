import React from "react";
import { Container, Row, Col, Card, Badge, ListGroup, Popover, OverlayTrigger, Button, Modal, Form } from "react-bootstrap";

import supabaseClient from "../utils/supabaseClient";
import { Navigate, useLocation } from "react-router-dom";

import deloitte from "../images/deloitte.png";
import blocks from "../images/blocks.png";
import worten from "../images/worten.jpg";
import premium_minds from "../images/premium_minds.png";
import cgd from "../images/cgd.jpg";
import sea_ai from "../images/sea_ai.png";
import mauser from "../images/mauser.png";
import noesis from "../images/noesis.png";

function Partners() {
  let location = useLocation();

  function showPartner(partner) {
    let popups = document.getElementById("popups");
    popups.style.display = "flex";
    let partnerElem = document.getElementById(partner);
    partnerElem.style.display = "block";
  }
  function closePartner(partner) {
    let popups = document.getElementById("popups");
    popups.style.display = "none";
    let partnerElem = document.getElementById(partner);
    partnerElem.style.display = "none";
  }

  if (supabaseClient.auth.user() === null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <Container fluid style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ color: "#1CE8BB", marginBottom: "5vh" }}>Parcerias:</h1>
      <div className="bigPartnersGrid">
        <div className="bigPartner premium" onClick={() => showPartner("premium")}>
          <img src={premium_minds} alt="" />
        </div>
        <div className="bigPartner cgd" onClick={() => showPartner("cgd")}>
          <img src={cgd} alt="" />
        </div>
      </div>

      <div className="partnersGrid">
        <div className="partner sea_ai" onClick={() => showPartner("sea_ai")}>
          <img src={sea_ai} alt="" />
        </div>
        <div className="partner worten" onClick={() => showPartner("worten")}>
          <img src={worten} alt="" />
        </div>
        <div className="partner blocks" onClick={() => showPartner("blocks")}>
          <img src={blocks} alt="" />
        </div>
        <div className="partner deloitte" onClick={() => showPartner("deloitte")}>
          <img src={deloitte} alt="" />
        </div>
        <div className="partner mauser" onClick={() => showPartner("mauser")}>
          <img src={mauser} alt="" />
        </div>
        <div className="partner noesis" onClick={() => showPartner("noesis")}>
          <img src={noesis} alt="" />
        </div>
      </div>
      <div id="popups" className="popups">
        <div id="deloitte" className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2 style={{ color: "black" }}>Deloitte</h2>
              <span onClick={() => closePartner("deloitte")} className="close">
                X
              </span>
            </div>
            <div className="popup-body">
              <p>
                A Deloitte ?? uma marca global com mais de 5000 pessoas em Portugal, das quais mais de 1200 trabalham em ??reas tecnol??gicas. Somos l??deres globais na presta????o de servi??os profissionais
                e registamos um crescimento not??rio nas ??reas tecnol??gicas, onde oferecemos uma ampla escolha de tecnologias e desafios em alguns dos melhores projetos a n??vel nacional e
                internacional.
              </p>
              <p>
                Na Deloitte acreditamos que o impacto que criamos se multiplica quando trabalhamos em equipa. Juntos podemos mudar o mundo ??? torn??-lo mais humano, eficiente e tecnol??gico. Mas isso s??
                ?? poss??vel se conectarmos o teu talento ao de outras pessoas como tu! ?? por isso que a Deloitte se junta a ti como empresa parceira do NEECathon.
              </p>
              <video style={{ width: "100%" }} controls>
                <source src="../parcerias/videos/deloitte.mp4" type="video/mp4"></source>
              </video>
            </div>

            <div className="popup-footer">
              <a href="../parcerias/pdfs/deloitte.pdf" target="_blank" rel="noreferrer">
                Deloitte.pdf
              </a>{" "}
              <a href="../parcerias/imagens/deloitte.jpg" target="_blank" rel="noreferrer">
                Deloitte.png
              </a>
              <a href="../parcerias/videos/deloitte.mp4" target="_blank" rel="noreferrer">
                You will never work alone.mp4
              </a>
              <a href="../parcerias/videos/Office Tour.mp4" target="_blank" rel="noreferrer">
                Office Tour.mp4
              </a>
              <a href="../parcerias/videos/Deloitte Tech Experience  May 2022_1080p.mp4" target="_blank" rel="noreferrer">
                Deloitte Tech Experience May 2022_1080p.mp4
              </a>
            </div>
          </div>
        </div>
        <div id="premium" className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2 style={{ color: "black" }}>Premium Minds</h2>
              <span onClick={() => closePartner("premium")} className="close">
                X
              </span>
            </div>
            <div className="popup-body">
              <p>
                A Premium Minds ?? uma Software House que desenvolve aplica????es web e mobile ?? medida para clientes empresariais desde 2002. As suas equipas experimentam e procuram diferentes pr??ticas
                recomendadas de desenvolvimento de produtos e usam um conjunto variado de tecnologias e linguagens de programa????o o que lhes permite escolher a melhor solu????o para cada problema.
              </p>
              <p>A Premium Minds ser?? a nossa anfitri?? pelo quarto ano consecutivo ????</p>
            </div>
            <div className="popup-footer"></div>
          </div>
        </div>
        <div id="sea_ai" className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2 style={{ color: "black" }}>SEA.AI</h2>
              <span onClick={() => closePartner("sea_ai")} className="close">
                X
              </span>
            </div>
            <div className="popup-body">
              <p>
                A SEA.AI ?? baseada em processamento de imagem para a navega????o mar??tima e lida com os mais variados sensores. Os seus dispositivos analisam qualquer situa????o e ajudam a evitar colis??es
                com qualquer objecto que a embarca????o poder?? encontrar durante a navega????o.
              </p>
              <p>O sistema avisa a tripula????o de qualquer perigo, classifica o obst??culo e acompanha a sua posi????o e dist??ncia.</p>
            </div>
            <div className="popup-footer"></div>
          </div>
        </div>
        <div id="worten" className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2 style={{ color: "black" }}>Worten</h2>
              <span onClick={() => closePartner("worten")} className="close">
                X
              </span>
            </div>
            <div className="popup-body">
              <p>
                A Worten ?? uma empresa de retalho eletr??nica fundada em 1996. Conhecida e vista como uma empresa de confian??a por Portugal inteiro, a Worten lidera o mercado de distribui????o eletr??nica
                e digital, focada em trazer o melhor da tecnologia a todos.
              </p>
            </div>
            <div className="popup-footer">
              <a href="../parcerias/imagens/worten.png" target="_blank" rel="noreferrer">
                Worten.png
              </a>
            </div>
          </div>
        </div>{" "}
        <div id="blocks" className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2 style={{ color: "black" }}>Blocks</h2>
              <span onClick={() => closePartner("blocks")} className="close">
                X
              </span>
            </div>
            <div className="popup-body">
              <p>A Blocks ?? uma empresa portuguesa que desenvolve impressoras 3D, e que vai estar presente na NEECathon.</p>
              <p>
                Fundada em 2013, tem o objetivo de construir impressoras 3D focadas no segmento industrial que sejam f??ceis de usar, inovadoras e capazes de efetuar qualquer tarefa a que o utilizador
                se proponha.
              </p>
            </div>
            <div className="popup-footer">
              <a href="../parcerias/pdfs/R21.pdf" target="_blank" rel="noreferrer">
                R21.pdf
              </a>
              <a href="../parcerias/pdfs/RD50.pdf" target="_blank" rel="noreferrer">
                RD50.pdf
              </a>
            </div>
          </div>
        </div>
        <div id="noesis" className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2 style={{ color: "black" }}>noesis</h2>
              <span onClick={() => closePartner("noesis")} className="close">
                X
              </span>
            </div>
            <div className="popup-body">
              <p>
                Somos uma consultora de inova????o tecnol??gica internacional que oferece servi??os e solu????es para apoiar os seus clientes na transforma????o digital e no desenvolvimento dos seus neg??cios.
              </p>
              <p>De forma a criar um valor sustent??vel e transversal a todos os setores, a Noesis fornece solu????es centradas em infraestruturas, software, qualidade e pessoas.</p>
              <iframe
                style={{ width: "100%" }}
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                width="788.54"
                height="443"
                type="text/html"
                src="https://www.youtube.com/embed/wXbf_2F1KsI?autoplay=0"
              >
                <div>
                  <small>
                    <a href="https://youtubeembedcode.com/en">youtubeembedcode en</a>
                  </small>
                </div>
                <div>
                  <small>
                    <a href="https://mgacasinoutansvensklicens.se/">malta casino utan svensk licens</a>
                  </small>
                </div>
                <div>
                  <small>
                    <a href="https://youtubeembedcode.com/nl/">youtubeembedcode.com/nl/</a>
                  </small>
                </div>
                <div>
                  <small>
                    <a href="https://unoregler.com/da/">uno regler dansk</a>
                  </small>
                </div>
              </iframe>
            </div>
            <div className="popup-footer">
              <a href="../parcerias/images/noesis.png" target="_blank" rel="noreferrer">
                Noesis.png
              </a>
              <a href="../parcerias/images/noesis1.png" target="_blank" rel="noreferrer">
                Lisbon Data & Ai Forum.png
              </a>
            </div>
          </div>
        </div>
        <div id="mauser" className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2 style={{ color: "black" }}>Robert Mauser</h2>
              <span onClick={() => closePartner("mauser")} className="close">
                X
              </span>
            </div>
            <div className="popup-body">
              <p>Sendo uma das lojas de eletr??nica mais conhecida em Portugal, a Robert Mauser, vai ser o grande patrocionador de eletr??nica para o evento.</p>
              <p>Uma loja de confian??a e grande disponibilidade de material e equipamente, seja para grandes projectos ou hobbies.</p>
            </div>
            <div className="popup-footer"></div>
          </div>
        </div>
        <div id="cgd" className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2 style={{ color: "black" }}>Caixa Geral de Dep??sitos</h2>
              <span onClick={() => closePartner("cgd")} className="close">
                X
              </span>
            </div>
            <div className="popup-body">
              <p>
                Caixa Geral de Dep??sitos (CGD) is a major player in the Portuguese financial market. CGD, formed as a public limited liability company by the Portuguese state, in 1876, is one of
                Portugal???s leading institutions and fully owned by Republic of Portugal.
              </p>
              <p>
                CGD has been at the forefront of Portuguese economic and social development. Based on a strong corporate culture and the highest ethical standards, rigor and professionalism, CGD has
                received over the years various awards and is recognized as a highly reliable, solid bank in Portugal???s banking sector, having merited the confidence of its many generations of
                costumers.
              </p>
            </div>
            <div className="popup-footer"></div>
          </div>
        </div>
      </div>
    </Container>
  );
}
export default Partners;
