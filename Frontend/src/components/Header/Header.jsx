import React from 'react';
import { assets } from '../../assets/assets';
import './Header.css';

const Header = () => {
  return (
    <div
      className="header"
      style={{ backgroundImage: `url(${assets.header_img2})` }}
    >
      <div className="header-contents">
        <h2>Order your Favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients...
        </p>
        <a href="#explore-menu">
          <button>View Menu</button>
        </a>
      </div>
    </div>
  );
};

export default Header;
