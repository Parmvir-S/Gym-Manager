import React from 'react'
import {
    Card,
    ListGroup,
    ListGroupItem,
    Button
  } from "react-bootstrap";

function UserCard({userData}) {
    if (userData.salary === undefined){
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
                        <Button variant="danger">
                            Change Name
                        </Button>
                    </Card.Body>
                </Card>

            </div>
        )}
        else {
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
                        <ListGroupItem>Salary: {userData.salary}</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Button variant="danger">
                            Change Name
                        </Button>
                    </Card.Body>
                </Card>

            </div>
        )
    }

}

export default UserCard