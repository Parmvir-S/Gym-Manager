import React, { useState } from 'react'
import Axios from "axios";
import {Button, Table} from "react-bootstrap";

function SelectGyms({userData}) {
    const [locations, setLocations] = useState([]);

    const getLocations = () => {
        const url = "http://localhost:3001/getAllGyms";
        Axios.get(url, {
            params: {
                ownerEmail: userData.email
            }
        }).then((res) => {
            setLocations(res.data);
        }).catch((e) => {
            console.log("Unable to fetch locations");
        })
    }

    const getEquippedLocations = () => {
        const url = "http://localhost:3001/getEquippedGyms";
        Axios.get(url, {
            params: {
                ownerEmail: userData.email
            }
        }).then((res) => {
            setLocations(res.data);
        }).catch((e) => {
            console.log("Unable to fetch locations");
        })
    }


    const setUserLocation = (locationInput) => {
        console.log(locationInput)
        const currUser = JSON.parse(localStorage.getItem("User"));
        currUser.locationID = locationInput;
        localStorage.setItem("User", JSON.stringify(currUser));

        const url = "http://localhost:3001/setUserLocation";
        const params = {email: userData.email, locationID: locationInput};
        Axios.post(url, params).then((res) => {
            alert("User location set!");
            console.log("User location set!");
            window.location.reload();
        }).catch((e) => {
            alert("Error setting user location :(");
            console.log("Unable to set user location");
        })
    }

    return (
        <div>
            <Button className="mt-4" variant="danger" onClick={getLocations}>Get Locations</Button>
            <Button className="mt-4" variant="danger" onClick={getEquippedLocations}>Get Fully Equipped Locations</Button>
            <br/> <br/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Postal Code</th>
                </tr>
                </thead>
                <tbody>
                {locations.map((location, index) => {
                    if (location.postalCode !== "000000")
                    return (
                        <tr key={index}>
                            <td>{location.locationName}</td>
                            <td>{location.streetAddress}</td>
                            <td>{location.postalCode}</td>
                            <td><div><Button variant="danger" onClick={() => setUserLocation(location.locationID)}>Set Location</Button></div></td>
                        </tr>
                    )
                    return null;
                })}
                </tbody>
            </Table>
        </div>
    )
}

export default SelectGyms