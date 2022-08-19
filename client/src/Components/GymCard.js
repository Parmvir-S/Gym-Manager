import React from 'react'
import {
    Card,
    ListGroup,
    ListGroupItem
  } from "react-bootstrap";

//UserCard
function GymCard({gymData}) {
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
                src={`https://avatars.dicebear.com/api/jdenticon/${gymData.locationName}.svg`}
              />
              <Card.Body>
                <Card.Title>{gymData.locationName}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>LocationID: {gymData.locationId}</ListGroupItem>
                <ListGroupItem>Address: {gymData.streetAddress}</ListGroupItem>
                <ListGroupItem>Postal Code: {gymData.postalCode}</ListGroupItem>
                <ListGroupItem>Province: {gymData.revenue}</ListGroupItem>
              </ListGroup>
            </Card>

    </div>
  )
}

export default GymCard