import React, { useEffect, useContext } from 'react';
import "./verify.css";
import { useNavigate, useSearchParams } from 'react-router';
import { StoreContext } from '../../context/Storecontext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId"); 
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifypayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });

      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    verifypayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner">
      
      </div>
    </div>
  );
};

export default Verify;
