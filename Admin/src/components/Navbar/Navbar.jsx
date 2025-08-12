import React from 'react'
import "./Navbar.css"
import {assets} from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
       <h1 className='logo-h'><img src={assets.logos} alt="" className="logo" />FOODZY</h1>
    </div>
  )
}

export default Navbar