import React, {useEffect, useState} from 'react';
import Axios from "axios";
import UserCard from "../Components/UserCard";
import ViewMembership from "../Components/ViewMembership";
import SelectGyms from "../Components/SelectGyms";
import ViewMachines from "../Components/ViewMachines";
import { Card, ListGroup, ListGroupItem, Button, Dropdown, Container, Col, Row } from "react-bootstrap";

function Customer() {
  const [email, setEmail] = useState("abc@gmail.com");
  const [location, setLocation] = useState(0);

  const [trainer, setTrainer] = useState(0);

  const [isVisible, setVisibility] = useState(false);



  const baseUrl = "http://localhost:3001/customer/";
  const baseEmployeeURL = "http://localhost:3001/employee/";
  

  const userEmail = baseUrl + email;

  let unParsedUserData = localStorage.getItem("User");
  let userData = JSON.parse(unParsedUserData);

  function addTrainer() {
    setVisibility(!isVisible);
  };


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

export default Customer