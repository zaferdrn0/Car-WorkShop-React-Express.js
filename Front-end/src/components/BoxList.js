import React from "react";
import "./css/boxlist.css";
import { useNavigate } from "react-router-dom";

const BoxList = (props) => {
  const { name, address, phone, description, image } = props;
  const navigate = useNavigate();

  const Bas = () =>{
    let query = "id="+ props.id
    navigate("/workshop?"+query)
  }

  return (
    <div className="workshop-list-box">
      <img src={`/images/${image}`} alt="Ürün Resmi" />
      <h2>{name}</h2>
      <p> {description} </p>
      <address>{address}</address>
      <div className="phone">{phone}</div>
      <div className="workshop-list-button">
        <button onClick={Bas}>Daha Fazlası</button>
      </div>
    </div>
  );
};

export default BoxList;
