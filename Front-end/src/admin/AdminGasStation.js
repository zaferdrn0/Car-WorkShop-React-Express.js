import React, { useContext, useEffect, useState } from "react";
import TableList from "../components/TableList";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useStepperContext,
} from "@mui/material";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import { context } from "../context/UserControl";

const AdminGasStation = () => {
  const [station, setStation] = useState([]);
  const [stationPage, setStationPage] = useState("");
  const [stationName, setStationName] = useState("");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [stationBrand, setStationBrand] = useState("");
  const { city } = useContext(context);
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [districts, setDistricts] = useState([]);
  const [fuel, setFuel] = useState("");

  const handleChangeCity = (event) => {
    setCityName(event.target.value);
  };

  const handleChangeDistrict = (event) => {
    setDistrictName(event.target.value);
  };

  const getDistricts = async () => {
    if (cityName === "") return;
    const queryParams = new URLSearchParams({ city: cityName });
    backendFetchGET(
      "/getDistrict?" + queryParams.toString(),
      async (response) => {
        if (response.status === 404) return;
        const data = await response.json();
        setDistricts(data);
      }
    );
  };

  useEffect(() => {
    getDistricts();
  }, [cityName]);

  const AddBrand = () => {
    backendFetchPOST("/addStationBrand", { brand: brand }, async (response) => {
      const data = await response.json();
      console.log(data);
    });
  };

  const handleChangeBrand = (event) => {
    setStationBrand(event.target.value);
  };

  useEffect(() => {
    backendFetchGET("/getStationBrand", async (response) => {
      const data = await response.json();
      setBrands(data);
    });
  }, []);

  const AddGasStation = () => {
    backendFetchPOST(
      "/addGasStation",
      {
        cityName: cityName,
        districtName: districtName,
        stationBrand: stationBrand,
        stationName: stationName,
      },
      async (response) => {
        const data = await response.json();
        console.log(data);
      }
    );
  };

  useEffect(() => {
    backendFetchGET("/getGasStation", async (response) => {
      if (response === undefined) return;
      const data = await response.json();
      setStation(data);
    });
  }, []);

  const deleteStation = () => {
    console.log("geyy");
  };
  const updateStation = () => {
    console.log("heyy");
  };

  const columnNames = ["Name", "Adres", "Brand"];

  const rowValues = station.map((station) => {
    return {
      [columnNames[0]]: station.ad,
      [columnNames[1]]: station.address.city,
      [columnNames[2]]: station.brand,
    };
  });

  const AddFuel = () => {
    
    backendFetchPOST("/addFuels", { fuel: fuel }, async (response) => {
      if(response.status === 400) return
      const data = await response.json();
      console.log(data);
    });
  };

  if (stationPage === "") {
    return (
      <div>
        <div className="admin-top-header">
          <h3>Gas Station Control Panel</h3>
          <button
            className="ekle-admin"
            onClick={() => {
              setStationPage("addBrand");
            }}
          >
            Add To Gas Brand
          </button>
          <button
            className="ekle-admin"
            onClick={() => {
              setStationPage("addFuel");
            }}
          >
            Add To Fuel Type
          </button>
          <button
            className="ekle-admin"
            onClick={() => {
              setStationPage("addStation");
            }}
          >
            Add To Station
          </button>
        </div>
        <div className="table-admin">
          {" "}
          <TableList
            columnNames={columnNames}
            rowValues={rowValues}
            onUpdate={updateStation}
            onDelete={deleteStation}
          />
        </div>
      </div>
    );
  } else if (stationPage === "addStation") {
    return (
      <div>
        <div className="admin-top-header">
          <h3>Gas Station Control Panel</h3>
          <button
            className="ekle-admin"
            onClick={() => {
              setStationPage("");
            }}
          >
            Back To Station
          </button>
        </div>
        <div>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 180, Height: 500 }}
          >
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
            <InputLabel id="demo-simple-select-standard-label">İlçe</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={districtName}
              onChange={handleChangeDistrict}
              label="İlçe"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {districts.map((dist, index) => (
                <MenuItem key={index} value={dist}>
                  {dist}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 180, Height: 500 }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Akaryakı İstasyonu
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={stationBrand}
              onChange={handleChangeBrand}
              label="Akaryakı İstasyonu"
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
          <TextField
            id="standard-basic"
            label="Station Name"
            variant="standard"
            value={stationName}
            onChange={(event) => setStationName(event.target.value)}
          />
          <div>
            <Button onClick={AddGasStation} variant="contained">
              ADD Brand
            </Button>
          </div>
        </div>
      </div>
    );
  } else if (stationPage === "addBrand") {
    return (
      <div>
        {" "}
        <div className="admin-top-header">
          <h3>Gas Station Control Panel</h3>
          <button
            className="ekle-admin"
            onClick={() => {
              setStationPage("");
            }}
          >
            Back To Station
          </button>
        </div>
        <div>
          <TextField
            sx={{ mb: 2 }}
            id="standard-basic"
            label="Brand"
            variant="standard"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
          />
        </div>
        <div>
          <Button onClick={AddBrand} variant="contained">
            ADD Brand
          </Button>
        </div>
      </div>
    );
  } else if (stationPage === "addFuel") {
    return (
      <div>
        {" "}
        <div className="admin-top-header">
          <h3>Gas Station Control Panel</h3>
          <button
            className="ekle-admin"
            onClick={() => {
              setStationPage("");
            }}
          >
            Back To Station
          </button>
        </div>
        <div>
          <TextField
            sx={{ mb: 2 }}
            id="standard-basic"
            label="Fuel Type"
            variant="standard"
            value={fuel}
            onChange={(event) => setFuel(event.target.value)}
          />
        </div>
        <div>
          <Button onClick={AddFuel} variant="contained">
            ADD Fuel Type
          </Button>
        </div>
      </div>
    );
  }
};

export default AdminGasStation;
