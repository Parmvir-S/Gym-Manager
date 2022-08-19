import React from 'react'
import {Col, Container, Row} from "react-bootstrap";
import UserCard from "../Components/UserCard";
import ViewMembership from "../Components/ViewMembership";
import SelectGyms from "../Components/SelectGyms";
import ViewMachines from "../Components/ViewMachines";

function Manager() {
  let unParsedUserData = localStorage.getItem("User");
  let userData = JSON.parse(unParsedUserData);
  return (
      <div>
        <Container>
          <Row>
            <Col>
              <UserCard userData={userData}/>
            </Col>
            <Col>
              <ViewMembership userData={userData}/>
            </Col>
            <Col>
              <SelectGyms userData={userData}/>
              <ViewMachines userData={userData}/>
            </Col>
          </Row>
        </Container>
      </div>
  )
}

export default Manager