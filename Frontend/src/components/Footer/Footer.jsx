import "./Footer.css"
import { assets } from "../../assets/assets"

const Footer = () => {
  return (
    <div className="footer" id="footer">
<div className="footer-content">
    <div className="footer-content-left">
       <div className="footer-logo-h">
    <img src={assets.logos} alt="logo" className="footer-logo" />
    <span className="footer-brand">FOODZY</span>
  </div>
  <p className="footer-description">
    At FOODZY, we bring restaurant-quality meals right to your doorstep. With a focus on freshness, flavor, and speed, we ensure every bite is a delight. Experience the excellence of fast, reliable, and quality food delivery.
  </p>
  <div className="footer-social-icons">
    <img src={assets.facebook_icon} alt="facebook" />
    <img src={assets.twitter_icon} alt="twitter" />
    <img src={assets.linkedin_icon} alt="linkedin" />
  </div>
    </div>
    <div className="footer-content-right">
    <h2>COMPANY</h2>
    <ul>
       <li>Home</li>
       <li>About us</li>
       <li>Delivery</li>
       <li>Privacy policy</li>
    </ul>
    </div>
    <div className="footer-content-center">
        <h2>GET IN TOUCH</h2>
        <ul>
            <li>+81-212-345-68</li>
            <li>contact@foodzy.com</li>
        </ul>
    </div>
</div>
<hr />
<p className="footer-copyright">
    Copyright 2025 @ FOODZY.com -All Right Reserved
</p>
    </div>
  )
}

export default Footer