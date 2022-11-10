import React from "react";
import { Container,  Row, Col, Card,} from "react-bootstrap"

import Schedule from "./Schedule";



function Home() {
    return (
        <Container className="mt-2" fluid>
            <Row>
                <Col style={{maxWidth: "35vw"}}>
                </Col>
                
            <Col style={{maxWidth: "65vw"}}> 
            <Card>
                    <Card.Body>
                        <Schedule/>
                    </Card.Body>
                </Card>
                

            </Col>
            </Row>
        </Container>    
    );
}
export default Home;