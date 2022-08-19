import React from 'react'
import {useNavigate} from "react-router-dom";
import {Button, Image} from "react-bootstrap";
import "../Styling/home.css";

import P_GYMBANNER from "../Assets/Images/gymBanner.jpg";
import P_DB from "../Assets/Images/db.jpg";
import P_GYM from "../Assets/Images/gym.jpg";
import P_TM from "../Assets/Images/tm.jpg";

function Home() {
  const navigate = useNavigate();
  const jumpToSignup = () => {
    navigate("/signup")
  }  
  const jumpToLogin = () => {
    navigate("/login");
  }

  return (
    <div className='home'>

      <div className='topArea'>
        <h1>Gym Management App</h1>
        <div className='signupLoginButtons'>
          <Button variant="secondary" onClick={jumpToSignup}>Signup</Button>
          <Button variant="secondary" onClick={jumpToLogin}>Login</Button>
        </div>
      </div>

      <Image src={P_GYMBANNER}></Image>

      <div className='circlePhotos'>
        <Image width="200" src={P_DB} roundedCircle={true}></Image>
        <Image width="200" src={P_GYM} roundedCircle={true}></Image>
        <Image width="200" src={P_TM} roundedCircle={true}></Image>
      </div>

    </div>
  )
}

export default Home