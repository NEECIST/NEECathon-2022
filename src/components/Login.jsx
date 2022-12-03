import { Container, Button } from "react-bootstrap";
import { Auth } from "@supabase/ui";
import signIn from "../utils/signIn";
import supabaseClient from "../utils/supabaseClient";
import { FaGoogle } from "react-icons/fa";
import { Navigate } from "react-router-dom";

import topimage from "../images/top_part.svg";
import bottomimage from "../images/bottom_part.svg";
import logo from "../images/logo.svg";
import Footer from "../components/Footer";

function Login() {
  if (supabaseClient.auth.user()) {
    return <Navigate to="/home" />;
  } else {
    return (
      <Container fluid className="p-0">
        <img className="waves top" src={topimage} alt="topimage" />
        <div className="container">
          <div className="login_box">
            <img src={logo} alt="Logo NEECathon" />
            <div className="body">
              <h3>Sê muito bem vindo à 4ª edição da NEECathon!</h3>
              <Auth.UserContextProvider supabaseClient={supabaseClient}>
                <Button size="lg" onClick={() => signIn(supabaseClient)}>
                  <FaGoogle /> Login com Google
                </Button>
              </Auth.UserContextProvider>
            </div>
          </div>

          <Footer />
        </div>
        <img className="waves bottom" src={bottomimage} alt="topimage" />
      </Container>

      // <Container className="text-center">
      //   <Row style={{height:"50vh" ,flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
      //     <Card className="mx-5 mt-4" bg="light" text="dark"
      //           border="light" style={{width:"20vw"}}>
      //       <div className="text-center"><Card.Img src="/horizontal_logo.svg" style={{width:"80%"}}/></div>
      //       <Card.Body>
      //         <Card.Title as="h3">Bem vindo à NEECathon 2021!!!</Card.Title>
      //         <Card.Text as="h4" className="mb-4">
      //           Para continuar faz login
      //         </Card.Text>
      //         <Auth.UserContextProvider supabaseClient={supabaseClient}>
      //           {/* <div className="d-grid gap-2" > */}
      //             <Button size="lg" onClick={() => signIn(supabaseClient)}> <FcGoogle/> Login com Google</Button>
      //           {/* </div> */}
      //         </Auth.UserContextProvider>
      //       </Card.Body>
      //     </Card>
      //   </Row>
      // </Container>
    );
  }
}
export default Login;
