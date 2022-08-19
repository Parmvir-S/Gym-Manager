import React, { useState } from 'react'
import Axios from "axios";
import {Button, Table} from "react-bootstrap";

function ViewMachines({userData}) {
    const [machines, setMachines] = useState([]);
    const locationID = JSON.parse(localStorage.getItem("User")).locationID;

    const getMachines = () => {
        const url = "http://localhost:3001/getMachines";
        Axios.get(url, {
            params: {
                locationID: locationID
            }
        }).then((res) => {
            setMachines(res.data);
        }).catch((e) => {
            console.log("Unable to fetch machines");
        })
    }

    const getMachinesHaving = () => {
        const url = "http://localhost:3001/getMachinesHaving";
        Axios.get(url, {
            params: {
                locationID: locationID
            }
        }).then((res) => {
            setMachines(res.data);
        }).catch((e) => {
            console.log("Unable to fetch machines");
        })
    }


    return (
        <div>
            <Button variant="danger" onClick={getMachines}>Get your gym's available machines</Button> 
            <br/> <br/> 
            <Button variant="danger" onClick={getMachinesHaving}>ExerciseTypes With >= 3 Machines</Button>    <br/> <br/>
            <br/> <br/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Exercise Type</th>
                    <th># Of Machines</th>
                </tr>
                </thead>
                <tbody>
                {machines.map((machine, index) => {
                    return (
                        <tr key={index}>
                            <td>{machine.machineName}</td>
                            <td>{machine.exerciseType}</td>
                            <td>{machine.NumberOfEquipment}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    )
}

export default ViewMachines