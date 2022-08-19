import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import GymOwner from './Pages/GymOwner';
import Staff from "./Pages/Staff";
import Manager from "./Pages/Manager";
import Trainer from "./Pages/Trainer";
import Customer from "./Pages/Customer";
import AddMachines from './Pages/AddMachines';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/owner" element={<GymOwner/>}/>
          <Route exact path="/staff" element={<Staff/>}/>
          <Route exact path="/manager" element={<Manager/>}/>
          <Route exact path="/trainer" element={<Trainer/>}/>
          <Route exact path="/customer" element={<Customer/>}/>
          <Route exact path="/addMachines" element={<AddMachines/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
