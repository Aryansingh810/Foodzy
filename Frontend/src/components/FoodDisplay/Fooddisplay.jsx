import { useContext } from "react";
import "./Fooddisplay.css";
import { StoreContext } from "../../context/Storecontext";
import Fooditem from "../Fooditem/Fooditem";

const Fooddisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  if (!food_list) return null; 
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <Fooditem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Fooddisplay;
