import React, {useState} from 'react'
import {Form, Button, Alert} from "react-bootstrap";
import Axios from "axios";

function CreateGym({userData}) {
    const [locationID, setLocationID] = useState(0);
    const [locationName, setLocationName] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");

    const createGymLocation = () => {
        const url = "http://localhost:3001/createGym";
        const gym = {
            locationID,
            locationName,
            streetAddress,
            postalCode,
            city,
            province,
            revenue: 0,
            ownerEmail: userData.email
        }
        Axios.post(url, gym).then((res) => {
          alert(res.data.message);
        }).catch(e => {
          alert("Unable To Create Gym");
        })
    }

  return (
    <div>
    <Form>
      <Form.Group className="mb-2 mt-4">
        <Form.Control type="number" placeholder="Id" 
          value={locationID}
          onInput={(e) => setLocationID(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control type="text" placeholder="Name" 
          value={locationName}
          onInput={(e) => setLocationName(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control type="text" placeholder="Street Address" 
          value={streetAddress}
          onInput={(e) => setStreetAddress(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control type="text" placeholder="Postal Code" 
          value={postalCode}
          onInput={(e) => setPostalCode(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control type="text" placeholder="City" 
          value={city}
          onInput={(e) => setCity(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control type="text" placeholder="Province" 
          value={province}
          onInput={(e) => setProvince(e.target.value)}/>
      </Form.Group>

      <Button variant="danger" type="submit" onClick={createGymLocation}>
        Open gym
      </Button>
    </Form>
    <hr/>
    </div>
  )
}

export default CreateGym