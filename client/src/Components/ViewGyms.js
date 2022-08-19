import React, { useState } from 'react'
import Axios from "axios";
import {Button, Table, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Styling/viewGyms.css";

function ViewGyms({userData}) {
  const [locations, setLocations] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [visible, setVisible] = useState(false)
  const [updatedRev, setUpdatedRev] = useState(0);
  const [modalData, setModalData] = useState({});
  const [bigSpenders, setSpenders] = useState([]);
  const [avgVisible, setAvgVisible] = useState(false)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 
    const getLocations = () => {
      const url = "http://localhost:3001/getGyms";
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

    const updateRevenue = () => {
      const url = "http://localhost:3001/updateRevenue";
      const updateRevData = {
        locationID: modalData.locationID,
        revenue: updatedRev
      }

      Axios.patch(url, updateRevData).then((result) => {
        alert(result.data.message)
      }).catch(e => {
        alert("Unable to update revenue for this location")
      })
    }

    const addToLocalStorage = (data) => {
      localStorage.setItem("locationData", JSON.stringify(data))
    } 

    const getMaxSortedLocations = () => {
      const url = "http://localhost:3001/getMaxSortedGyms";
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

    const getTrainers = (locationID) => {
      const url = "http://localhost:3001/employee/" + locationID;
      Axios.get(url).then((res) => {
        setTrainers(res.data);
        setVisible(!visible);
      }).catch((e) => {
        console.log("Unable to fetch locations");
      })
    }

    
    const fire = (email) => {
      const url = "http://localhost:3001/employee/" + email;
      Axios.delete(url).then((res) => {
        console.log(res)
        window.location.reload()
      }).catch((e) => {
        console.log("Unable to fetch locations");
      })
    }

    const getAverageSalaryByLocation = () => {
      const url = "http://localhost:3001/averageSalary";
      Axios.get(url).then((res) => {
        setSpenders(res.data)
        setAvgVisible(!avgVisible)
      }).catch((e) => {
        console.log("Unable to fetch locations");
      })
    }

  return (
    <div>
      <div className='tableButtons'>
        <Button variant="danger" onClick={getLocations}>Get Locations</Button>
        <Button variant="danger" onClick={getMaxSortedLocations}>Max Revenue</Button>
      </div>
      <br/> <br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>locationID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Revenue</th>
            <th>Trainers</th>
          </tr>
        </thead>
        <tbody>
            {locations.map((location, index) => {
              return (
                <tr key={index}>
                  <td><Link to={"/addMachines"} onClick={() => addToLocalStorage({locationId: location.locationID,
                                                                locationName: location.locationName,
                                                                streetAddress: location.streetAddress,
                                                                postalCode: location.postalCode,
                                                                revenue: location.revenue
                  })}>{location.locationID}</Link></td>
                  <td>{location.locationName}</td>
                  <td>{location.streetAddress}</td>
                  <td>{location.postalCode}</td>
                  <td onClick={() => {
                    setModalData(location);
                    handleShow();
                    }}>{location.revenue}</td>
                    <td><Button variant="danger" onClick={() => {getTrainers(location.locationID)}}>Get Trainers</Button></td>
                </tr>
              )
            })}
        </tbody>
      </Table>
      {visible && <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
            {trainers.map((trainer, index) => {
              return (
                <tr key={index}>
                  <td>{trainer.employeeName}</td>
                  <td>{trainer.employeeEmail}</td>
                  <td><div><Button variant="danger" onClick={() => fire(trainer.employeeEmail)}>FIRE</Button></div></td>
                </tr>
              )
            })}
        </tbody>
      </Table>}
      *Click LocationID To Add Gym Equipment
      <br/>
      *Click Revenue To Update Revenue
      <br></br>
      <br></br>
      <br></br>
      <h6> Click to see the gyms spending more than the average amount on salaries. </h6>
      <h6> See your gym on the list? Consider firing some trainers</h6>
      <Button variant="danger" onClick={getAverageSalaryByLocation}> Wall of Shame: Big Salary Spenders </Button>
      {avgVisible && <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount spent on Employee Salaries</th>
          </tr>
        </thead>
        <tbody>
            {bigSpenders.map((gym, index) => {
              return (
                <tr key={index}>
                  <td>{gym.locationName}</td>
                  <td>{gym.avg}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>}
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Revenue</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please Enter This Locations New Revenue Value:</Modal.Body>
        <Form.Control
          id="updateInput"
          value={updatedRev}
          onInput={(e) => setUpdatedRev(e.target.value)}
          type="text"
          placeholder="....."
        />
        <Modal.Footer>
          <Button variant="danger" onClick={()=>{
            updateRevenue();
            handleClose();
            }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ViewGyms