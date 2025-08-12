import React, { useState, useEffect } from 'react';
import './order.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllorders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const statushandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    });
    if (response.data.success) {
      await fetchAllorders();
    }
  };

  useEffect(() => {
    fetchAllorders();
  }, []);

  return (
    <div className="order-page">
      <h2>All Orders</h2>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <div className="order-info">
              <h3 className='order-item-food'>
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} <b>x {item.quantity}</b>{i !== order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </h3>
              <p className='order-item-name'>
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className='order-item-address'>
                <p>{order.address.street},</p>
                <p>{order.address.city}, {order.address.pincode}, {order.address.state}, {order.address.country}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p><strong>Items:</strong> {order.items.length}</p>
            <p><strong>Total:</strong> ${order.amount}</p>
            <select onChange={(event) => statushandler(event, order._id)} value={order.status}>
              <option value="Food processing">Food Processing</option>
              <option value="Out for delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
