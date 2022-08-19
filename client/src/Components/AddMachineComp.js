import React, {useState} from 'react'
import {Form, Button, ListGroupItem} from "react-bootstrap";
import Axios from "axios";

function AddMachineComp({gymData}) {
    const [machineName, setMachineName] = useState("");
    const [exerciseType, setExerciseType] = useState("");

    const addMachine= () => {
        const url = "http://localhost:3001/addMachine";
        const machine = {
            machineName,
            exerciseType,
            machineID: `${machineName + gymData.locationId}`,
            locationID: gymData.locationId
        }
        Axios.post(url, machine).then((res) => {
          alert(res.data.message);
        }).catch(e => {
          alert("Unable To add machine");
        })
    }

  return (
    <div>
    <Form className="mt-3">
      <Form.Group className="mb-2">
        <ListGroupItem>Machine Name:</ListGroupItem>
        <Form.Control type="text" placeholder="Name" 
          value={machineName}
          onInput={(e) => setMachineName(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-2">
        <ListGroupItem>Exercise Type:</ListGroupItem>
        <Form.Control type="text" placeholder="Cardio, Strength, Endurance, Hypertrophy" 
          value={exerciseType}
          onInput={(e) => setExerciseType(e.target.value)}/>
      </Form.Group>

      <Button variant="danger" type="submit" onClick={addMachine}>
        Add
      </Button>
    </Form>
    <hr/>
    </div>
  )
}

export default AddMachineComp