import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext("null");

const StoreContextProvider = (props) => {
  const [cartItems, setcartItems] = useState({});
  const url = "https://foodzy-backend-40t3.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);


  const addtocart = async (itemid) => {
    if (!cartItems[itemid]) {
      setcartItems((prev) => ({ ...prev, [itemid]: 1 }));
    } else {
      setcartItems((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        {
          userId: localStorage.getItem("userId"),
          itemId: itemid,
        },
        { headers: { token } }
      );
    }
  };

  const removefromcart = async (itemid) => {
    setcartItems((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }));

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        {
          userId: localStorage.getItem("userId"),
          itemId: itemid,
        },
        { headers: { token } }
      );
    }
  };

  
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let iteminfo = food_list.find(
          (product) => String(product._id) === String(item)
        );
        if (iteminfo) {
          totalAmount += iteminfo.price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

 
  const fetchFoodlist = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };


  const loadcartdata = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setcartItems(response.data.cartData);
  };

 
  useEffect(() => {
    async function loadData() {
      await fetchFoodlist();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadcartdata(savedToken);
      }
    }

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setcartItems,
    addtocart,
    removefromcart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
