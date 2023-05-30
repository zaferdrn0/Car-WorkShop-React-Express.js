import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { backendFetchPOST } from "../utils/backendFetch";
import { useSearchParams } from "react-router-dom";

const StarRating = (props) => {
  const {star, disable, onChange} = props
  const [rating, setRating] = useState();
  const [isVoted, setIsVoted] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();
  let WorkshopId = searchParams.get("id");



  const addStar = () => {
    backendFetchPOST("/addStar", {id:WorkshopId, rating:rating}, async (response) => {
      const data = await response.json();
      console.log(data)
    });
  };

  useEffect(() => {
    if (rating === undefined) return;
    addStar();
  }, [rating]);
  let stringStar = star.toString()
  if(stringStar === "NaN")
  {
    stringStar = "0"
  }
  return (
    <div className="rate">
      <Rating
        size="large"
        name="star-rating"
        value={star}
        readOnly = {disable}
        precision={0.5}
        onChange={(event) => {
          setRating(event.target.value)
          onChange(event.target.value,isVoted); 
          setIsVoted(true)
        }}
      />{" "}
      <h5>{stringStar}</h5>
    </div>
  );
};

export default StarRating;
