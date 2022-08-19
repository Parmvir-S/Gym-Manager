import React, {useState} from 'react'
import { Card, ListGroup, ListGroupItem, Form, Button } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import P_SIGNUP from "../Assets/Images/gym.jpg";

import "../Styling/signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [userType, setUserType] = useState("");
  let navigate = useNavigate();

  const addUser = () => {
    const url = "http://localhost:3001/signup";
    const user = {
      name, email, password, city, postalCode, province, userType: userType.toLowerCase()
    }
    Axios.post(url, user).then((res) => {
      alert(`Welcome ${res.data.name}`)
      localStorage.setItem("User", JSON.stringify(res.data));
      navigate(`/${res.data.userType}`);
    }).catch((error) => {
      console.log("Not Able To Sign up")
    });
  }


  return (
<div className="signup">
      <Card style={{ width: "28rem", textAlign: "center" }}>
      <Card.Img src={P_SIGNUP} className="img" variant="top"/>
        <Card.Body>
          <Card.Title>Sign Up</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Name:</ListGroupItem>
          <Form.Control
            value={name}
            onInput={(e) => setName(e.target.value)}
            type="text"
            placeholder="LeBron James"
          />
          <ListGroupItem>Email:</ListGroupItem>
          <Form.Control
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="TorontoRaptors@gmail.com"
          />
          <ListGroupItem>Password:</ListGroupItem>
          <Form.Control
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Akatsuki567$"
          />

            <ListGroupItem>City:</ListGroupItem>
            <Form.Control
              value={city}
              onInput={(e) => setCity(e.target.value)}
              type="text"
              placeholder="Vancouver"
            />
          
          <div className='legendaryFDs'>
            <ListGroupItem id="pc">Postal Code:</ListGroupItem>
            <Form.Control
              value={postalCode}
              onInput={(e) => setPostalCode(e.target.value)}
              type="text"
              placeholder="V5C4N2"
            />


            <ListGroupItem>Province:</ListGroupItem>
            <Form.Control
              value={province}
              onInput={(e) => setProvince(e.target.value)}
              type="text"
              placeholder="BC"
            />
          </div>

          <ListGroupItem>Position:</ListGroupItem>
            <Form.Control
              value={userType}
              onInput={(e) => setUserType(e.target.value)}
              type="text"
              placeholder="Options: Owner, Staff, Manager, Trainer, Customer"
            />

        </ListGroup>
        <Button onClick={addUser} variant="danger">
          Signup
        </Button>
      </Card>
    </div>
  )
}

export default Signup