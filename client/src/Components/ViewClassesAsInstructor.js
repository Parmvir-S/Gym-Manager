import React, { useEffect, useState } from 'react'
import Axios from "axios";
import {Button, Table, Card, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import UserCard from './UserCard';


function ViewClasses({props}) {

    const [fitnessClasses, setClasses] = useState([]);
    const [time, setTime] = useState(0)

    let unParsedUserData = localStorage.getItem("User");
    let userData = JSON.parse(unParsedUserData);

 
    const getClasses = () => {
      const url = "http://localhost:3001/getClasses/teacher/" +userData.email;
      Axios.get(url, {
      }).then((res) => {
        console.log(res.data)
        setClasses(res.data);
      }).catch((e) => {
        console.log("Unable to fetch classes");
      })
    }

    function handleClick(className, classLocation, timeslot) {
        const url = "http://localhost:3001/getClasses/" +className + "/" + classLocation + "/" + timeslot
        //console.log(url)
        // Axios.delete(url, {
        // }).then((res) => {
        //   console.log(res.data)
        //   setClasses(res.data);
        // }).catch((e) => {
        //   console.log("Unable to fetch classes");
        // })

    }

  return (
    <div>
      <br/> <br/>
      <Button variant="danger" onClick={getClasses}>Upcoming Classes</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Timeslot (24hr)</th>
          </tr>
        </thead>
        <tbody>
            {fitnessClasses.map((fitnessClass, index) => {
              return (
                <tr key={index}>
                  <td>{fitnessClass.className}</td>
                  <td>{fitnessClass.classLocation}</td>
                  <td>{fitnessClass.timeslot}</td>
                  <div><Button variant="danger" onClick={() => handleClick(fitnessClass.className, fitnessClass.classLocation, fitnessClass.timeslot )}>Cancel Class</Button></div>

                </tr>
              )
            })}
        </tbody>
      </Table>
    </div>
  )
}

export default ViewClasses