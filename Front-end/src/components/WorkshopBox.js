import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import { useSearchParams } from "react-router-dom";
import Slideshow from "./Slideshow";
import { Box } from "@mui/material";

const WorkshopBox = (props) => {
  const { workshop } = props;
  const [stars, setStars] = useState([]);
  const [didVote, setDidVote] = useState([]);

  let [searchParams, setSearchParams] = useSearchParams();
  let id = searchParams.get("id");
  let queryParams = new URLSearchParams({
    id: id,
  });

  const getStars = async () => {
    try {
      backendFetchGET(
        "/getStar?" + queryParams.toString(),
        async (response) => {
          const data = await response.json();
          setStars(data.value);
          setDidVote(data.didVote);
        }
      );
    } catch {}
  };

  useEffect(() => {
    getStars();
  }, []);

  let sum = 0;
  stars.forEach((number) => (sum += number));
  let rating = stars.length > 0 ? sum / stars.length : 0;
  let starRating = rating.toFixed(1);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <React.Fragment>
      {workshop && workshop.image && (
        <div className="workshop-component">
          <Box
            sx={{ height: "500px", width: "800px", }}
            className="left"
          >
            <Slideshow images={workshop.image} />
          </Box>
          <div className="right">
            <div className="left">
              <div>
                <h2>{workshop.name}</h2>
                <h3>{workshop.description}</h3>
                <hr></hr>
              </div>
              <div className="brand-repair">
                <hr></hr>
                <div className="brand">
                  <h2>Markalar</h2>
                  {workshop?.brand?.map((brand, index) => {
                    return <h4 key={index}>{brand.brand}</h4>;
                  })}
                </div>
                <div className="repair">
                  <h2>Tamir Turu</h2>
                  {workshop?.maintenance?.map((repair, index) => {
                    return <h4 key={index}>{repair.ad}</h4>;
                  })}
                </div>
                <hr></hr>
              </div>
              <div className="rate-star">
                <StarRating
                  star={parseFloat(starRating)}
                  disable={didVote}
                  onChange={(newRating, isAlreadyVoted) => {
                    setStars((prevState) => {
                      let toReturn = [...prevState];
                      isAlreadyVoted
                        ? (toReturn[toReturn.length - 2] =
                            parseFloat(newRating))
                        : toReturn.push(parseFloat(newRating));

                      setDidVote(true);
                      return toReturn;
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="map-phone-container">
        <h2>Konum ve İletişim Bilgileri</h2>
        <div className="map-phone">
          <div>
            <img src="images/googleMaps.png" alt="Google Maps" />
          </div>
          <div className="location-phone">
            <h2>
              {workshop?.address?.address +
                "  " +
                workshop?.address?.city +
                "  " +
                workshop?.address?.distict}
            </h2>
            <h2>{workshop?.address?.description}</h2>
            <hr></hr>
            <div className="phone-email">
              <div className="phone">
                <h3>Telefon : {workshop?.phone}</h3>
                <h3>Eposta : {workshop?.email} </h3>
                <h3>
                  <a href={"https://" + workshop?.website}>Web Site</a>
                </h3>
              </div>

              <div>
                <h3>Başlangıc: {workshop?.workingHours?.start}</h3>
                <h3>Bitis: {workshop?.workingHours?.end}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WorkshopBox;
