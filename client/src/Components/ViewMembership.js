import React, { useEffect, useState } from 'react'
import Axios from "axios";
import {Button, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import ViewTrainers from "../Components/ViewTrainers";
import ViewClasses from "../Components/ViewClasses";

function ViewMembership() {
    let unParsedUserData = localStorage.getItem("User");
    let userData = JSON.parse(unParsedUserData);


    const [membership, setMembershipName] = useState(userData.membershipID);
    const [cost, setCost] = useState(" ");
    const [schedule, setSchedule] = useState(" ");
    const [isVisible, setVisible] = useState(true);
    const navigate = useNavigate();

    const baseMembershipURL = "http://localhost:3001/membership/";
    const userMembership = baseMembershipURL + userData.membershipID;

 
  function getMembershipName() {
    Axios.get(userMembership).then((res) => {
        //console.log(res.data)
        setMembershipName(res.data.name)
        setCost(res.data.cost)
        setSchedule(res.data.paySchedule)
    }).catch((error) => {
    console.log("error getting membership info from id: "+ error)
    })
  };

  function upgradeMembership() {
    //TODO: reload
    Axios.post(userMembership, {cost: cost}).then((res) => {
        alert("Updated your membership!")
        console.log(res.data)
        setMembershipName(res.data.name)
        setCost(res.data.cost)
        setSchedule(res.data.paySchedule)
        navigate("/customer")
    }).catch((error) => {
    console.log("error upgrading membership: "+ error)

    })
  };

  return (
    <div>
      {getMembershipName()}
      <br/> <br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Membership Type</th>
            <th>Cost</th>
            <th>Schedule</th>
          </tr>
        </thead>
        <tbody>
            <td>{membership}</td>
            <td>{cost}</td>
            <td>{schedule}</td>
        </tbody>
      </Table>
      {(membership === "standard") && <Button onClick={upgradeMembership}>Upgrade Membership</Button>}
      {(membership === "premium") && <ViewTrainers props= {userData}> </ViewTrainers>}
      {(membership === "premium") && <ViewClasses props= {userData}> </ViewClasses>}
      
    </div>
  )
}

export default ViewMembership