import React, { useEffect, useState } from 'react'
import Axios from "axios";
import {Button, Table, Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import UserCard from './UserCard';


function ViewTrainers({props}) {

    const [hasTrainer, setTrainerStatus] = useState(false);
    const [trainerName, setTrainerName] = useState(null);
    const [allTrainers, setAllTrainers] = useState([]);
    const baseEmployeeURL = "http://localhost:3001/employee/";
    const baseCustomerURL = "http://localhost:3001/customer/";
    const navigate = useNavigate();
    //const userTrainer = baseEmployeeURL + trainer;

    let unParsedUserData = localStorage.getItem("User");
    let userData = JSON.parse(unParsedUserData);

 
    useEffect(() => {


       Axios.get(baseCustomerURL + props.email).then((res) => {
            //setTrainerStatus(res.data)
            let employeeEmail = res.data[0].employeeEmail
            setTrainerStatus(res.data[0].employeeEmail !== null)
            userData["employeeEmail"] = employeeEmail
            localStorage.setItem("User", JSON.stringify(userData))
            
        }).catch((error) => {
            console.log("error getting location from id: "+ error)
        })

    
        if(hasTrainer || props.employeeEmail !== null) {
        const userTrainer = baseEmployeeURL + "find/" + props.employeeEmail;
        Axios.get(userTrainer).then((res) => {
            setTrainerName(res.data[0].employeeName)
        }).catch((error) => {
            console.log("error getting location from id: "+ error)
        })
    } else {
        const trainerLocation = baseEmployeeURL + props.locationID
        Axios.get(trainerLocation).then((res) => {
            setAllTrainers(res.data)
        }).catch((error) => {
            console.log("oops error showing all trainers: " + error)
        })


    }
  }, []);

  function handleChange(event) {
    let email = props.email
    const addTrainerURL = "http://localhost:3001/customer/" + email + "/" + event.target.value;

    Axios.post(addTrainerURL).then((res) => {
        alert("added your new trainer!")
        let trainer = allTrainers.filter((element) => {
            return (element.employeeEmail === event.target.value)
        })
        let selectedTrainer = trainer[0].employeeName
        setTrainerName(selectedTrainer)
        setTrainerStatus(true)
        
        console.log(trainerName)

    }).catch((error) => {
        console.log("error adding in a trainer: " + error)
    })
  }


  return (
    <div>
        {(hasTrainer) && <Card>Trainer: {trainerName}</Card>}
        <br></br>
        <br></br>
        {(!hasTrainer) && <select className="form-select" aria-label="Default select example" onChange={handleChange} >
            <option selected>Select a Trainer</option>
            {allTrainers.map((trainer, index) => {
                return (
                    <option key={index} value={trainer.employeeEmail}>{trainer.employeeName}</option>
                )
            })}
            
            {/* <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option> */}
        </select>}
    </div>
  )
}

export default ViewTrainers