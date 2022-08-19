import React from 'react'
import {Col, Container, Row} from "react-bootstrap";
import UserCard from "../Components/UserCard";
import ViewMembership from "../Components/ViewMembership";
import SelectGyms from "../Components/SelectGyms";
import ViewMachines from "../Components/ViewMachines";

function Staff() {
  let unParsedUserData = localStorage.getItem("User");
  let userData = JSON.parse(unParsedUserData);
  console.log(userData);
  return (
      <div>
        <Container>
          <Row>
            <Col>
              <UserCard userData={userData}/>
            </Col>
          </Row>
        </Container>
      </div>
  )
}

export default Staff