import React from "react";
import "./css/boxlist.css";

const BoxList = (props) => {
  const { name, address, phone, description, image } = props;

  return (
    <div className="workshop-list-box">
      <img src={`/images/${image}`} alt="Ürün Resmi" />
      <h2>{name}</h2>
      <p> {description} </p>
      <address>{address}</address>
      <div className="phone">{phone}</div>
      <div className="workshop-list-button">
        <button>Daha Fazlası</button>
      </div>
    </div>
  );
};

export default BoxList;
