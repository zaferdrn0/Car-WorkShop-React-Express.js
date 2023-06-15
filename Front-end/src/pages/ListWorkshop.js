import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { backendFetchGET } from "../utils/backendFetch";
import BoxList from "../components/BoxList";
import "./css/opps.css";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const ListWorkshop = () => {
  const [workshop, setWorkshop] = useState([]);
  const [orderType, setOrderType] = useState("rating");
  const [filter, setFilter] = useState("");

  let [searchParams, setSearchParams] = useSearchParams();
  let brand = searchParams.get("brand");
  let rtype = searchParams.get("rtype");
  let city = searchParams.get("city");
  let district = searchParams.get("district");
  let queryParams = new URLSearchParams({
    brand: brand,
    rtype: rtype,
    city: city,
    district: district,
  });

  let BoxListArr = workshop.slice();

  function calculateRating(ratings) {
    let sum = 0.0;
    ratings.forEach((rating) => (sum += parseFloat(rating.star)));
    let rating = sum / ratings.length;
    rating = parseFloat(rating.toFixed(1));
    if (isNaN(rating)) return 0;
    else return rating;
  }

  useEffect(() => {}, [filter]);

  if (filter === "enIyi") {
    BoxListArr.sort((a, b) => {
      if (orderType === "rating") {
        const rating_a = calculateRating(a.ratings);
        const rating_b = calculateRating(b.ratings);

        if (rating_a === rating_b) {
          if (rating_a.length < rating_b.length) return 1;
          else return -1;
        }
        if (rating_a < rating_b) return 1;
        else return -1;
      }
    });
  } else if (filter === "enEski") {
    let workshopCopy = [...workshop];
    const oldWorkshop = workshopCopy.reverse();
    BoxListArr = oldWorkshop;
  } else if (filter === "enKotu") {
    BoxListArr.sort((a, b) => {
      if (orderType === "rating") {
        const rating_a = calculateRating(a.ratings);
        const rating_b = calculateRating(b.ratings);

        if (rating_a === rating_b) {
          if (rating_a.length < rating_b.length) return -1;
          else return 1;
        }
        if (rating_a < rating_b) return -1;
        else return 1;
      }
    });
  }

  useEffect(() => {
    backendFetchGET(
      "/getFilterWorkshop?" + queryParams.toString(),
      async (response) => {
        const data = await response.json();
        setWorkshop(data);
      }
    );
  }, []);

  if (workshop.length !== 0) {
    return (
      <div>
        <div className="workshop-list-container">
          <Box
            sx={{
              bgcolor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 3,
            }}
          >
            <Typography variant="h4">Aracınıza Uygun Servisler</Typography>
            <FormControl sx={{ minWidth: "200px", ml: 10 }}>
              <InputLabel id="demo-simple-select-label">Filtrele</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Filtrele"
                onChange={(event) => setFilter(event.target.value)}
              >
                <MenuItem value={"onerilen"}>Önerilen Sıralama</MenuItem>
                <MenuItem value={"enIyi"}>En İyi</MenuItem>
                <MenuItem value={"enKotu"}>En Kötü</MenuItem>
                <MenuItem value={"enEski"}>En Yeni</MenuItem>
                
              </Select>
            </FormControl>
          </Box>

          <div className="workshop-list">
            {BoxListArr.map((item) => (
              <BoxList
                key={item._id}
                id={item._id}
                name={item.name}
                image={item.image}
                address={
                  item.address.city +
                  " " +
                  item.address.distict +
                  " " +
                  item.address.address
                }
                phone={item.phone}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else if (workshop.length === 0) {
    return (
      <div className="workshop-error-container">
        <img src="./images/Opps.png" alt="Opps!" width="400px" />
        <h1>Opps! Uygun Servis Bulunamadı</h1>
        <p>
          Maalesef aradığınız özelliklere sahip bir servis bulunamadı. Lütfen
          daha sonra tekrar deneyin ya da bizi arayarak destek alın.
        </p>
        <a href="/">
          <button>ANA SAYFAYA GERİ DÖN</button>
        </a>
      </div>
    );
  }
};

export default ListWorkshop;
