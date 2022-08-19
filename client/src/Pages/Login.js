import React, {useState} from 'react'
import { Card, ListGroup, ListGroupItem, Form, Button } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styling/login.css";
import P_LOGINPHOTO from "../Assets/Images/gym.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  let navigate = useNavigate();

  const loginUser = () => {
    const url = "http://localhost:3001/login";
    const user = {
      email, password, userType: userType.toLowerCase()
    };
    Axios.post(url, user).then((res) => {
      if (res.data.message) {
        alert(res.data.message);
      } else {
        alert(`Welcome ${res.data.name}`)
        localStorage.setItem("User", JSON.stringify(res.data));
        navigate(`/${res.data.userType}`);
      }
    }).catch((error) => {
      console.log("Not Able To Login")
    });
  }

  return (
    <div className="login">
    <Card style={{ width: "28rem", textAlign: "center" }}>
      <Card.Img src={P_LOGINPHOTO} id="img" variant="top"/>
      <Card.Body>
        <Card.Title>Login</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Email:</ListGroupItem>
        <Form.Control
          value={email}
          onInput={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Group24@gmail.com"
        />
        <ListGroupItem>Password:</ListGroupItem>
        <Form.Control
          value={password}
          onInput={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password123"
        />
        <ListGroupItem>Position:</ListGroupItem>
            <Form.Control
              value={userType}
              onInput={(e) => setUserType(e.target.value)}
              type="text"
              placeholder="Options: Owner, Staff, Manager, Trainer, Customer"
        />
      </ListGroup>
      <Button onClick={loginUser} variant="danger">Login</Button>
    </Card>
  </div>
  )
}

export default Login