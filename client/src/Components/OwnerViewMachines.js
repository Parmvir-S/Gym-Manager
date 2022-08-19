import React, { useState } from 'react'
import Axios from "axios";
import {Button, Table} from "react-bootstrap";

function OwnerViewMachines({gymData}) {

    const [machines, setMachines] = useState([]);
    const [exerciseType, setExerciseType] = useState(""); 

    const [machineCount, setMachineCount] = useState([]);

    const getMachines = () => {
        const url = "http://localhost:3001/getMachines";
        Axios.get(url, {
            params: {
                locationID: gymData.locationId
            }
        }).then((res) => {
            setMachines(res.data)
        }).catch(e => {
            console.log("unable to get machines")
        })
    }

    const getMachineExercisType = () => {
      const url = "http://localhost:3001/getMachinesFiltered";
      Axios.get(url, {
          params: {
              locationID: gymData.locationId,
              exerciseType: exerciseType
          }
      }).then((res) => {
          setMachines(res.data)
      }).catch(e => {
          console.log("unable to get machines")
      })
    }

    const getMachineCountForType = () => {
      const url = "http://localhost:3001/getMachineCountForType";
      Axios.get(url, {
          params: {
              locationID: gymData.locationId
          }
      }).then((res) => {
          setMachineCount(res.data)
      }).catch(e => {
          console.log("unable to get machines")
      })
  }

  return (
    <div>
    <Button variant="danger" onClick={getMachines}>Get All Machines</Button>
    <Button variant="danger" style={{marginLeft: "2em"}} onClick={getMachineCountForType}>Number Of Machines</Button>
    <br/> <br/>
    <input value={exerciseType} placeholder='Exercise Type' onChange={(e) => setExerciseType(e.target.value)}></input>
    <Button style={{marginLeft: "10px"}} variant="danger" onClick={getMachineExercisType}>Exercise Type</Button>
    <br/> <br/>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Machine Name</th>
          <th>Exercise Type</th>
          <th>Location ID</th>
        </tr>
      </thead>
      <tbody>
          {machines.map((machine, index) => {
            return (
              <tr key={index}>
                <td>{machine.machineName}</td>
                <td>{machine.exerciseType}</td>
                <td>{machine.locationID}</td>
              </tr>
            )
          })}
      </tbody>
    </Table>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Exercise Type</th>
          <th># Of Machines</th>
        </tr>
      </thead>
      <tbody>
          {machineCount.map((machine, index) => {
            return (
              <tr key={index}>
                <td>{machine.exerciseType}</td>
                <td>{machine.NumberOfMachines}</td>
              </tr>
            )
          })}
      </tbody>
    </Table>
  </div>
  )
}

export default OwnerViewMachines