import React, { useContext, useState, useRef } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/Storecontext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownTimer = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimer.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => {
      setShowDropdown(false);
    }, 1000); 
  };

  const Logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="logo-h">
          <img src={assets.logos} alt="" className="logo" />
          FOODZY
        </h1>
      </Link>

      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>home</Link>
        <a href="#explore-menu" onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>menu</a>
        <a href="#App-download" onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>mobile-app</a>
        <a href="#footer" onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>contact</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" className="icon" />
        <div className="navbar-icon-wrapper">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="cart" className="icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign-in</button>
        ) : (
          <div
            className="navbar-profile"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={assets.profile_icon} alt="profile" className="icon" />
            <ul className={`nav-profile-dropdown ${showDropdown ? 'visible' : ''}`}>
              <li onclick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={Logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
