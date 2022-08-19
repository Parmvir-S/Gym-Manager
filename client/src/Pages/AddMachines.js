import React from 'react'
import GymCard from '../Components/GymCard';
import { Container, Col, Row } from "react-bootstrap";
import AddMachineComp from '../Components/AddMachineComp';
import OwnerViewMachines from '../Components/OwnerViewMachines';

function AddMachines() {
    const locationData = JSON.parse(localStorage.getItem("locationData"));

  return (
    <div>
        <Container>
            <Row>
                <Col>
                    <GymCard gymData={locationData}/>
                </Col>
                <Col>
                    <Row>
                        <AddMachineComp gymData={locationData}/>
                    </Row>

                    <Row>
                        <OwnerViewMachines gymData={locationData}/>
                    </Row>
                </Col>
            </Row>
        </Container>
        
    </div>
  )
}

export default AddMachines