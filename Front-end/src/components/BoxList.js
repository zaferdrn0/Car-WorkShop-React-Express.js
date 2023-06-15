import React, { useEffect, useState } from "react";
import "./css/boxlist.css";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import { backendFetchGET } from "../utils/backendFetch";

const BoxList = (props) => {
  const { name, address, phone, description, image } = props;
  const [stars,setStars] = useState([]);
  const navigate = useNavigate();

  const Bas = () =>{
    let query = "id="+ props.id
    navigate("/workshop?"+query)
  }
  let id = props.id
  let queryParams =  new URLSearchParams({
    id: id
  });

  const getStars = async () =>{
    try{
   backendFetchGET("/getStar?"+ queryParams.toString(), async (response) =>{
        const data = await response.json();
        setStars(data.value)
      })
    }catch{

    }

  }


  useEffect( () =>{
    getStars();
   
  },[])

  let sum = 0;
  stars.forEach(number => (sum += number));
  let rating = sum/stars.length
  let starRating = rating.toFixed(1)
  

  return (
    <div className="workshop-list-box">
      <img src={`/images/${image[0]}`} alt="Ürün Resmi" />
      <h2>{name}</h2>
      <p> {description} </p>
      <address>{address}</address>
      <div className="phone">{phone}</div>
      <div className="rating" >
       <div className="star-rating">
        <StarRating
         star={parseFloat(starRating)}
         disable = {true}/> 
       </div>
       
        <div className="workshop-list-button">
        <button onClick={Bas}>Daha Fazlası</button>
        </div>
       
      </div>
    </div>
  );
};

export default BoxList;
