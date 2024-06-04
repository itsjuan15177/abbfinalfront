import React from 'react';
import './Navbar.css';
import ABBlogo from './ABBlogo.png';

const Navbar=()=>{
  return(
    <nav class="topnav">
         <img className='Logo' src={ABBlogo}/>
    <div>
      <h1><b>Shipment Tracker</b></h1>
    </div>
  </nav>

  );
}


export default Navbar

