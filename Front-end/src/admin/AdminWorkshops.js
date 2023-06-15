import React, { useEffect, useState } from "react";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import TableList from "../components/TableList";
import "./adminCss/modal.css";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const AdminWorkshops = () => {
  const [page, setPage] = useState("table");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [repairTypes, setRepairTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [district, setDistrict] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [name, setName] = useState("");
  const [cityName, setCityName] = useState("");
  const [dist, setDist] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [workshopId, setWorkshopId] = useState("");
  const [repairType, setRepairType] = useState("");
  const [workshopRow, setWorkshopRow] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const getBrands = async () => {
    backendFetchGET("/getMarka", async (response) => {
      const data = await response.json();
      setBrands(data);
    });
  };

  const getRepairType = () => {
    backendFetchGET("/getRType", async (response) => {
      const data = await response.json();
      setRepairTypes(data);
    });
  };

  const changeMarka = (event) => {
    const selectedBrand = event.target.value;
    setBrand(selectedBrand);
  };

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    getRepairType();
  }, []);

  useEffect(() => {
    backendFetchGET("/getCity", async (response) => {
      const data = await response.json();
      setCities(data);
    });
  }, []);

  const ChangeCity = (event) => {
    const selectedCity = event.target.value;
    setCityName(selectedCity);
  };
  const getDistrict = async () => {
    if (cityName === "") return;
    const queryParams = new URLSearchParams({ city: cityName });
    backendFetchGET(
      "/getDistrict?" + queryParams.toString(),
      async (response) => {
        if (response.status === 404) return;
        const data = await response.json();
        setDistrict(data);
      }
    );
  };
  useEffect(() => {
    getDistrict();
  }, [cityName]);

  useEffect(() => {
    const getWorkshop = () => {
      backendFetchGET("/getWorkshops", async (response) => {
        const data = await response.json();
        setWorkshops(data);
      });
    };
    getWorkshop();
  }, []);

  const columnNames = ["id", "Name", "Address", "Phone", "Description"];

  const rowValues = workshops.map((workshop) => {
    let id = workshop._id;
    return {
      [columnNames[0]]: id,
      [columnNames[1]]: workshop.name,
      [columnNames[2]]:
        workshop.address.city +
        " " +
        workshop.address.distict +
        " " +
        workshop.address.address,
      [columnNames[3]]: workshop.phone,
      [columnNames[4]]: workshop.description,
    };
  });

  const updateWorkshop = (row) => {
    setPage("addProps");
    setWorkshopId(row.id);
  };
  const deleteWorkshop = (row) => {
    console.log(row);
    backendFetchPOST("/deleteWorkshop", { id: row.id }, async (response) => {
      const data = await response.json();
      console.log(data);
    });
  };
  async function aboutWorkshop(row) {
    setIsVisible(!isVisible);
    let id = row.id;

    const queryParams = new URLSearchParams({ id: id });
    await backendFetchGET(
      "/getWorkshop?" + queryParams.toString(),
      async (response) => {
        const data = await response.json();
        setWorkshopRow(data);
      }
    );
  }

  const AddWorkshop = () => {
    let path = image;
    let uzantı = path.split("\\");
    let images = uzantı[2];

    backendFetchPOST(
      "/addWorkshop",
      {
        name: name,
        city: cityName,
        distict: dist,
        phone: phone,
        description: description,
        address: address,
        image: images,
      },
      async (response) => {
        const data = await response.json();
        console.log(data);
      }
    );
  };

  const AddWorkshopProps = () => {
    backendFetchPOST(
      "/addWorkshopProps",
      { id: workshopId, brand: brand, maintenance: repairType },
      async (response) => {
        const data = await response.json();
        console.log(data);
      }
    );
  };

  if (page === "table") {
    try {
      if (isVisible === true) {
        return (
          <div
            style={{ display: isVisible ? "block" : "none" }}
            className="modal"
          >
            <div className="workshop-modal">
              <h4>Name: {workshopRow.name}</h4>
              <h4>
                Address:{" "}
                {workshopRow.address.city +
                  " " +
                  workshopRow.address.distict +
                  " " +
                  workshopRow.address.address}{" "}
              </h4>
              <h4>Phone: {workshopRow.phone}</h4>
              <h4>Description: {workshopRow.description}</h4>
              <h4>
                Markalar:{" "}
                {workshopRow.brand.map((brand) => (
                  <p>{brand.brand} </p>
                ))}
              </h4>
              <h4>
                RepairTypes:{" "}
                {workshopRow.maintenance.map((rtype) => (
                  <p>{rtype.ad}</p>
                ))}
              </h4>
              <button
                className="modal-close"
                onClick={() => setIsVisible(!isVisible)}
              >
                Back
              </button>
            </div>
          </div>
        );
      }
    } catch {
      console.log("heyyo hata");
    }

    return (
      <div>
        <div className="admin-top-header">
          <h3>Workshop Control Page</h3>
          <button onClick={() => setPage("addWorkshop")}>
            Add To Workshop
          </button>
        </div>
        <div className="table-admin">
          {" "}
          <TableList
            columnNames={columnNames}
            rowValues={rowValues}
            onUpdate={updateWorkshop}
            onDelete={deleteWorkshop}
            onAbout={aboutWorkshop}
          />
        </div>
      </div>
    );
  } else if (page === "addWorkshop") {
    return (
      <Grid>
        <Box>
          <Button variant="contained" onClick={() => setPage("table")}>
            Back
          </Button>
        </Box>

        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ mb: 2 }}
            id="standard-basic"
            label="Workshop Name"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              City
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={cityName}
              onChange={ChangeCity}
              autoWidth
              label="City"
              sx={{ marginBottom: "20px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {cities.map((city, index) => {
                return (
                  <MenuItem key={index} value={city.ilAdi}>
                    {city.ilAdi}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              District
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={dist}
              onChange={(event) => setDist(event.target.value)}
              autoWidth
              label="District"
              sx={{ marginBottom: "20px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {district.map((dist, index) => {
                return (
                  <MenuItem key={index} value={dist}>
                    {dist}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <Typography>Image Add</Typography>
          <TextField
            sx={{ mb: 2 }}
            id="standard-basic"
            variant="filled"
            value={image}
            type="file"
            onChange={(event) => setImage(event.target.value)}
          />

          <TextField
            sx={{ mb: 2 }}
            id="standard-basic"
            variant="outlined"
            value={phone}
            type="number"
            label="Phone"
            onChange={(event) => setPhone(event.target.value)}
          />

          <TextField
            sx={{ mb: 2 }}
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            onChange={(event) => setDescription(event.target.value)}
          />
          <TextField
            sx={{ mb: 2 }}
            id="outlined-multiline-flexible"
            label="Address"
            multiline
            maxRows={4}
            onChange={(event) => setAddress(event.target.value)}
          />

          <Button variant="outlined" onClick={AddWorkshop}>
            WorkShop Add
          </Button>
        </Grid>
      </Grid>
    );
  } else if (page === "addProps") {
    return (
      <Grid>
        <Grid sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <Typography> Add WorkShop Props</Typography>
          <FormControl sx={{ m: 1, minWidth: 220, mt:5 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Select Brand
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={brand}
              onChange={changeMarka}
              autoWidth
              label="District"
              sx={{ marginBottom: "20px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {brands.map((brnd, index) => {
                return (
                  <MenuItem key={index} value={brnd.ad}>
                    {brnd.ad}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Select Repair Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={repairType}
              onChange={(event) => setRepairType(event.target.value)}
              autoWidth
              label="District"
              sx={{ marginBottom: "20px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {repairTypes.map((type, index) => {
                return (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={AddWorkshopProps}>Add Workshop Props</Button>
        </Grid>
      </Grid>
    );
  }
};

export default AdminWorkshops;
