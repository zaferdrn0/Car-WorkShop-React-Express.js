import React from "react";
import "./css/listCar.css";

const Box = (props) => {
  const { label, onClick } = props;

  return (
    
      <div className="listCar-container">
        <ul>
          <a onClick={onClick}>
            {" "}
            <li>
              {" "}
              <h4>{label}</h4>{" "}
            </li>
          </a>
        </ul>
      </div>
      
      
  );
};

export default Box;
