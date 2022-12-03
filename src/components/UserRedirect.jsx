import React, { useEffect , useState} from "react";
import {Container , Row , Col, Card} from "react-bootstrap"
import supabaseClient from "../utils/supabaseClient";
import { Navigate } from "react-router-dom"

import topimage from "../images/top_part.svg";
import bottomimage from "../images/bottom_part.svg";
import logo from "../images/logo.svg";
import Footer from '../components/Footer';

function UserRedirect() {
    const [loading, setLoading] = useState(true);
    const [logged, setLogged] = useState(undefined);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setTimeout(function(){
            if(supabaseClient.auth.user()===null){
                setLogged(false)
            }else{
                setLogged(true)
            }
            setLoading(false)
        },1000); 
    },[]);
    if(loading){
        return(
        <Container fluid className="p-0">
          <img className="waves top" src={topimage} alt="topimage"/>
          <div className="container">
            <div className="login_box">
              <img src={logo} alt="Logo NEECathon"/>
              <div className="body">
                <h1 style={{color:"white", paddingBottom:"6vh"}}>Logging in...</h1>
              </div>
              
            </div>
          
            <Footer />
          </div>
          <img className="waves bottom" src={bottomimage} alt="topimage"/>

        </Container>
        // <Container className="text-center">
        //   <Row>
        //     <Col />
        //     <Col >
        //     <Card className="mx-5 mt-4" bg="light" text="dark" 
        //           border="light" >
        //       <div className="text-center"><Card.Img src="/horizontal_logo.svg" style={{width:"80%"}}/></div>
        //       <Card.Body>
        //         <Card.Title as="h3">Logging in...</Card.Title>
        //       </Card.Body>
        //     </Card> 
        //     </Col>
        //     <Col />
        //   </Row>
        // </Container>)
        )
    }
    if(loader){
        return(<Navigate to="/login" />)
    }
    if(logged){
        return(<Navigate to="/home" />)
    }
    else{
        setTimeout(function(){
            setLoader(true)
        },5000); 
        return (
            <Container fluid className="p-0">
          <img className="waves top" src={topimage} alt="topimage"/>
          <div className="container">
            <div className="login_box">
              <img src={logo} alt="Logo NEECathon"/>
              <div className="body">
                <h1 style={{color:"white", paddingBottom:"6vh"}}>Utilizador não encontrado a redirecionar para a pagina de login.</h1>
              </div>
              
            </div>
          
            <Footer />
          </div>
          <img className="waves bottom" src={bottomimage} alt="topimage"/>

        </Container>
        );
    }
}
export default UserRedirect;

