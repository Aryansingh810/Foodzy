import React, { useContext, useState, useEffect } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../context/Storecontext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    street: "",
    pincode: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const onchangehandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeorder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });
    if (orderItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    const orderdata = {
      userId: localStorage.getItem("userId"),
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20,
      paymentMethod
    };
    try {
      const response = await axios.post(`${url}/api/order/place`, orderdata, {
        headers: { token },
      });
      if (response.data.success) {
        if (paymentMethod === "cod" && response.data.redirect_url) {
          window.location.href = response.data.redirect_url;
        } else if (response.data.session_url) {
          window.location.href = response.data.session_url;
        } else {
          navigate("/myorders");
        }
      } else {
        alert("Order placement failed.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeorder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input required name='firstName' onChange={onchangehandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onchangehandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>

        <input required name='email' onChange={onchangehandler} value={data.email} type="email" placeholder='Email Address' />

        <select required name="country" onChange={onchangehandler} value={data.country} className="place-order-select">
          <option value="" disabled>Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>

        <select required name="state" onChange={onchangehandler} value={data.state} className="place-order-select">
          <option value="" disabled>State</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Rajasthan">Rajasthan</option>
        </select>

        <input required name='street' onChange={onchangehandler} value={data.street} type="text" placeholder='Street' />

        <input required name='pincode' onChange={onchangehandler} value={data.pincode} type="text" placeholder='Pin Code' />

        <input required name='phone' onChange={onchangehandler} value={data.phone} type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
            </div>
          </div>

          <div className="payment-method-container">
            <h5>Payment Method</h5>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                COD (Cash on Delivery)
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Stripe (Credit / Debit)
              </label>
            </div>
          </div>

          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
