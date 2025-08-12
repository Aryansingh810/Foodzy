import React, { useState, useContext, useEffect } from 'react';
import './Myorder.css';
import { StoreContext } from '../../context/Storecontext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Myorders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchorders = async () => {
    const response = await axios.post(url + '/api/order/userorders', {}, {
      headers: { token }
    });
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchorders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <p>
              {order.items.map((item, itemIndex) =>
                itemIndex === order.items.length - 1
                  ? `${item.name} x ${item.quantity}`
                  : `${item.name} x ${item.quantity}, `
              )}
            </p>
            <p>₹{order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <button onClick={fetchorders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myorders;
