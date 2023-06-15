import React, { useEffect, useState } from "react";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import TableList from "../components/TableList";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const AdminBrands = () => {
  const [brand, setBrand] = useState([]);

  const [pageState, setPageState] = useState("table");

  useEffect(() => {
    const getMarka = async () => {
      await backendFetchGET("/getMarka", async (response) => {
        const data = await response.json();
        setBrand(data);
      });
    };
    getMarka();
  }, []);

  const columnNames = ["Brand"];

  const rowValues = brand.map((brnd) => {
    return {
      [columnNames[0]]: brnd.ad,
    };
  });

  const updateBrand = (row) => {
    console.log("marka guncellendi");
    console.log(row);
  };
  const deleteBrand = (row) => {
    backendFetchPOST("/deleteBrand", { brand: row.Brand }, async (response) => {
      const data = await response.json();
      console.log(data);
    });
    const newAdminBrand = brand.filter((brand) => brand.ad !== row.Brand);
    setBrand(newAdminBrand);
  };
  const [brandSet, setbrandSet] = useState("");

  const AddBrand = () => {
    backendFetchPOST("/addMarka", { marka: brandSet }, async (response) => {
      const data = await response.json();
      console.log(data);
    });
  };

  if (pageState === "table") {
    return (
      <div>
        <div className="admin-top-header">
          <h3>Brand Control Panel</h3>
          <button
            className="ekle-admin"
            onClick={() => {
              setPageState("addUser");
            }}
          >
            Add To Brand
          </button>
        </div>
        <div className="table-admin">
          <TableList
            columnNames={columnNames}
            rowValues={rowValues}
            onUpdate={updateBrand}
            onDelete={deleteBrand}
          />
        </div>
      </div>
    );
  } else {
    return (
      <Grid>
        <Button
          variant="contained"
          onClick={() => {
            setPageState("table");
          }}
        >
          Back
        </Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography mb={2} variant="h4">
            Brand Add
          </Typography>
          <TextField
            id="outlined-basic"
            label="Brand"
            variant="outlined"
            onChange={(event) => setbrandSet(event.target.value)}
          />
          <Button sx={{ marginTop: 3 }} variant="contained" onClick={AddBrand}>
            Add
          </Button>
        </Box>
      </Grid>
    );
  }
};

export default AdminBrands;
