import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import CreateGym from '../Components/CreateGym';
import OwnerUserCard from "../Components/OwnerUserCard";
import ViewGyms from "../Components/ViewGyms";

function GymOwner() {

  let unParsedUserData = localStorage.getItem("User");
  let userData = JSON.parse(unParsedUserData);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <OwnerUserCard userData={userData}/>
          </Col>
          <Col>
            <Row>
              <CreateGym userData={userData}/>
            </Row>
            <Row>
              <ViewGyms userData={userData}/>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default GymOwner
