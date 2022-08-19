import React, { useEffect, useState } from 'react'
import Axios from "axios";
import {Button, Table, Card, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import UserCard from './UserCard';


function ViewClasses({props}) {

    const [fitnessClasses, setClasses] = useState([]);
    const [time, setTime] = useState(0)

 
    const getClasses = () => {
      const url = "http://localhost:3001/getClasses/" + time;
      Axios.get(url, {
      }).then((res) => {
        console.log(res.data)
        setClasses(res.data);
      }).catch((e) => {
        console.log("Unable to fetch classes");
      })
    }

  return (
    <div>
      <br/> <br/>
      <h5>Enter a start time for classes</h5>
      <Form.Control
              value={time}
              onInput={(e) => setTime(e.target.value)}
              type="text"
              placeholder= "Start time"
            />
      <br/> <br/>
      <Button variant="danger" onClick={getClasses}>View Class Schedule</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Trainer</th>
            <th>Timeslot (24hr)</th>
          </tr>
        </thead>
        <tbody>
            {fitnessClasses.map((fitnessClass, index) => {
              return (
                <tr key={index}>
                  <td>{fitnessClass.className}</td>
                  <td>{fitnessClass.classLocation}</td>
                  <td>{fitnessClass.employeeName}</td>
                  <td>{fitnessClass.timeslot}</td>

                </tr>
              )
            })}
        </tbody>
      </Table>
    </div>
  )
}

export default ViewClasses