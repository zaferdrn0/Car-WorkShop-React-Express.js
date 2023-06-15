import React, { useEffect, useState } from "react";
import TableList from "../components/TableList";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

const AdminModels = () => {
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [model, setModel] = useState("");
  const [pageState, setPageState] = useState("table");
  const getBrands = async () => {
    backendFetchGET("/getMarka", async (response) => {
      const data = await response.json();
      setBrands(data);
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
    // URLSearchParams oluşturmak için marka durumunu kullan
    const queryParams = new URLSearchParams({ marka: brand });
    const getModels = async () => {
      backendFetchGET(
        "/getModel?" + queryParams.toString(),
        async (response) => {
          if(response.status ===404) return 
          const data = await response.json();
          setModels(data);
          console.log(data);
        }
      );
    };

    getModels();
  }, [brand]);

  const columnNames = ["Model"];

  const rowValues = models.map((brnd) => {
    return {
      [columnNames[0]]: brnd.ad,
    };
  });

  const updateModel = (row) => {
    console.log("marka guncellendi");
    console.log(row);
  };
  const deleteModel = (row) => {
    backendFetchPOST(
      "/deleteModel",
      { marka: brand, model: row.Model },
      async (response) => {
        const data = await response.json();
        console.log(data);
      }
    );
  };

  const AddModel = () => {
    backendFetchPOST(
      "/addModel",
      { marka: brand, model: model },
      async (response) => {
        const data = await response.json();
        console.log(data);
      }
    );
  };

  if (pageState === "table") {
    return (
      <div>
        <div className="admin-top-header">
          <h3>Model Control Panel</h3>
          <div className="select-model">
            <h4>Please select the brand you want to list</h4>{" "}
            <select onChange={changeMarka} defaultValue={""}>
              <option value="" disabled>
                Select Brand
              </option>
              {brands.map((brnd, index) => {
                return (
                  <option key={index} value={brnd.ad}>
                    {brnd.ad}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            className="ekle-admin"
            onClick={() => {
              setPageState("addModel");
            }}
          >
            Add To Model
          </button>
        </div>

        <div className="table-admin">
          <TableList
            columnNames={columnNames}
            rowValues={rowValues}
            onUpdate={updateModel}
            onDelete={deleteModel}
          />
        </div>
      </div>
    );
  } else {
    return (
      <Grid >
        <Button
        variant="contained"
          onClick={() => {
            setPageState("table");
          }}
        >
       Back
        </Button>
        <Grid sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Brand</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={brand}
              onChange={changeMarka}
              autoWidth
              label="Brand"
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
         <TextField
          onChange={(event) => setModel(event.target.value)}
          id="outlined-basic"
          label="Model"
          variant="outlined"
         />
         
          <Button sx={{mt:5}} variant="contained" onClick={AddModel}> Model add</Button>
          </Grid>
        </Grid>
   
    );
  }
};

export default AdminModels;
