import React, {useState} from 'react'
import {
    Card,
    ListGroup,
    ListGroupItem,
    Button, 
    Modal,
    Form
  } from "react-bootstrap";
import Axios from "axios";

function OwnerUserCard({userData}) {
  const [ownerName, setOwnerName] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateOwner = () => {
    let currData = JSON.parse(localStorage.getItem("User"));
    if (ownerName !== "") {
      currData.name = ownerName;
    }
    localStorage.setItem("User", JSON.stringify(currData));

    const url = "http://localhost:3001/updateOwner";
    const ownerUpdate = {
      ownerEmail: userData.email,
      ownerName,
      ownerPassword
    }
    Axios.patch(url, ownerUpdate).then((result) => {
      alert(result.data.message);
    }).catch(e => {
      alert("Unable to update user information");
    })
  }

  return (
    <div>
         <Card
              style={{
                width: "18rem",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "5%",
                textAlign: "center",
              }}
              id="cardImg"
            >
              <Card.Img
                variant="top"
                src={`https://avatars.dicebear.com/api/avataaars/${userData.name}.svg`}
              />
              <Card.Body>
                <Card.Title>{userData.name}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Email: {userData.email}</ListGroupItem>
                <ListGroupItem>City: {userData.city}</ListGroupItem>
                <ListGroupItem>Postal Code: {userData.postalCode}</ListGroupItem>
                <ListGroupItem>Province: {userData.province}</ListGroupItem>
                <ListGroupItem>Position: {userData.userType}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Button variant="danger"
                onClick={handleShow}
                >
                  Change Name
                </Button>
              </Card.Body>
            </Card>
            
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update User Information</Modal.Title>
          </Modal.Header>

          <Modal.Body>Please Enter Your Information Below</Modal.Body>
          <Form.Control
            id="updateInput"
            value={ownerName}
            onInput={(e) => setOwnerName(e.target.value)}
            type="text"
            placeholder="Name..."
          />
          <Form.Control
            id="updateInput"
            value={ownerPassword}
            onInput={(e) => setOwnerPassword(e.target.value)}
            type="text"
            placeholder="Password..."
          />

          <Modal.Footer>
            <Button variant="danger" onClick={()=>{
              updateOwner();
              handleClose();
              }}>
              Save Changes
            </Button>
          </Modal.Footer>
      </Modal>
    </div>
  )
}

export default OwnerUserCard