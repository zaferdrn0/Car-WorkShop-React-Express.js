import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import { context } from "../context/UserControl";
import "./css/FuelAccount.css";
import { useNavigate } from "react-router-dom";

const FuelAdd = () => {
  const { city, loggedIn } = useContext(context);
  const [cityName, setCityName] = useState("");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [gasStation, setGasStation] = useState("");
  const [gasStations, setGasStations] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fuel, setFuel] = useState("");
  const [liter, setLiter] = useState("");
  const [distance, setDistance] = useState("");
  const [total, setTotal] = useState("");
  const [succesAlert,setSuccesAlert] = useState("none")
  const [errorAlert, setErrorAlert] = useState("none")
  const navigate = useNavigate();

  useEffect(() => {
    const adminCheck = () => {
      if (loggedIn === false) {
        navigate("/login");
      } else {
        setLoading(true);
        navigate("/fueladd");
      }
    };
    adminCheck();
  }, []);

  const handleChangeCity = (event) => {
    setCityName(event.target.value);
    setBrand("");
  };

  useEffect(() => {
    backendFetchGET("/getStationBrand", async (response) => {
      const data = await response.json();
      setBrands(data);
    });
  }, []);

  useEffect(() => {
    if (brand === "") return;
    const queryParams = new URLSearchParams({ brand: brand, city: cityName });
    backendFetchGET(
      "/getFilterGasStation?" + queryParams.toString(),
      async (response) => {
        if (response.status === 400) {
          return setGasStations([]);
        }
        const data = await response.json();
        setGasStations(data);
      }
    );
  }, [brand]);

  useEffect(() => {
    backendFetchGET("/getFuels", async (response) => {
      const data = await response.json();
      setFuels(data);
    });
  }, []);

  const fuelObj = {
    fuelStationId: gasStation,
    fuelType: fuel,
    stationBrand: brand,
    distance: distance,
    fuelliter: liter,
    fuelPrice: total,
  };

  const FuelAddFunction = () => {
    if (distance === "" || distance === "0") {
      console.log("tutarı dogru giriniz");
      setSuccesAlert("none")
      setErrorAlert("inline-flex")
      setTimeout(function(){setErrorAlert("none")},3000)
    } else {
      if (total === "" && liter === "") {
       
        setSuccesAlert("none")
        setErrorAlert("inline-flex")
        setTimeout(function(){setErrorAlert("none")},3000)
      } else {
        if (fuel === "") {
          setSuccesAlert("none")
          setErrorAlert("inline-flex")
          setTimeout(function(){setErrorAlert("none")},3000)
        } else {
          backendFetchPOST("/addUserFuel", fuelObj, async (response) => {
            if (response.status === 404) return;
            const data = await response.json();
            if(data.message ==="Basarıyla kayıt yapıldı"){
              setErrorAlert("none")
              setSuccesAlert("inline-flex")
              setTimeout(function(){setSuccesAlert("none")},3000)
            }
          });
        }
      }
    }
  };

  if (loading === true) {
    return (
      <div className="fuel-account">
        <div className="fuel-account-container">
          <div className="fuel-account-comboboxs">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Şehir
              </InputLabel>

              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={cityName}
                onChange={handleChangeCity}
                label="Şehir"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {city.map((cty, index) => (
                  <MenuItem key={index} value={cty.ilAdi}>
                    {cty.ilAdi}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 180, Height: 500 }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Akaryakıt Markası
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                label="Akaryakı Markası"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {brands.map((brand, index) => (
                  <MenuItem key={index} value={brand.ad}>
                    {brand.ad}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 180, Height: 500 }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Akaryakıt İstasyonu
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={gasStation}
                onChange={(event) => setGasStation(event.target.value)}
                label="Akaryakıt İstasyonu"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {gasStations.length !== 0 &&
                  gasStations.map((station, index) => (
                    <MenuItem key={index} value={station._id}>
                      {station.ad}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl
              required
              variant="standard"
              sx={{ m: 1, minWidth: 180, Height: 500 }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Akaryakıt Turu
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={fuel}
                onChange={(event) => setFuel(event.target.value)}
                label="Yakıt Turu"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {fuels.length !== 0 &&
                  fuels.map((fuel, index) => (
                    <MenuItem key={index} value={fuel.ad}>
                      {fuel.ad}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className="fuel-account-inputs">
            <TextField
              sx={{ mr: 5, mt: 1 }}
              id="standard-basic"
              label="Yakıt Litresini Giriniz"
              variant="filled"
              type="number"
              onChange={(event) => setLiter(event.target.value)}
            />
            <TextField
              sx={{ mr: 5, mt: 1 }}
              id="standard-basic"
              label="Yakıta Verdiginiz Tl Giriniz"
              variant="filled"
              type="number"
              onChange={(event) => setTotal(event.target.value)}
            />
            <TextField
              sx={{ mt: 1 }}
              id="standard-basic"
              label="Aracınızın Km'sini Giriniz"
              variant="filled"
              size="large"
              type="number"
              onChange={(event) => setDistance(event.target.value)}
            />
          </div>
          <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <Button
              onClick={FuelAddFunction}
              sx={{ mb: 2 }}
              variant="contained"
            >
              Yakıt Değerini Kaydet
            </Button>
            <Alert
              sx={{  mb: 2 , color: "Black",display:succesAlert,}}
              variant="outlined"
              severity="success"
              hidden = {errorAlert}
            >
              Yakıt Basarıyla Eklendi
            </Alert>
            <Alert sx={{  mb: 2,  color: "Black", display:errorAlert }} variant="outlined" severity="error">
              Hatalı Veri Girdiniz
            </Alert>
          </div>
        </div>
      </div>
    );
  } else {
    <div></div>;
  }
};

export default FuelAdd;
