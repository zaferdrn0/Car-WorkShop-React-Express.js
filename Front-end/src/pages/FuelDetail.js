import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { context } from "../context/UserControl";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";

const FuelDetail = () => {
  const { user } = useContext(context);
  const [userControl, setUserControl] = useState(false);
  const [fuelArr, setFuelArr] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fuelType, setFuelType] = useState([]);
  const [fuelTypeState, setFuelTypeState] = useState("");
  const [totalFuelPrice, setTotalFuelPrice] = useState(0);

  const queryParams = new URLSearchParams({ userid: user._id });

  useEffect(() => {
    if (user === "") {
      setUserControl(!userControl);
    } else {
      backendFetchGET(
        "/getUserFuel?" + queryParams.toString(),
        async (response) => {
          if (response.status === 400) return;
          const data = await response.json();
          setFuels(data);
          setFuelArr(data);
        }
      );
    }
  }, [userControl]);

  const DeleteFuel = (fuel) => {
    backendFetchPOST("/deleteUserFuel", { id: fuel._id }, async (response) => {
      if (response.status === 200) return;
      const data = await response.json();
      console.log(data);
    });
    setFuelArr(fuels.filter((f) => f._id !== fuel._id));
  };

  const table_style = {
    color: "white",
    textAlign: "center",
  };
  const column_style = {
    textAlign: "center",
  };

  const ReturnToStart = () => {
    setFuelArr(fuels);
  };

  const FuelFilterFunction = async () => {
    const startDates = new Date(startDate);
    const endDates = new Date(endDate);

    setFuelArr(
      fuels.filter((row) => {
        const daterow = new Date(row.date);

        if (fuelTypeState === "") {
          // Filter only by date range
          if (endDate === "") {
            return daterow >= startDates;
          } else if (startDate === "") {
            return daterow <= endDates;
          } else {
            return daterow >= startDates && daterow <= endDates;
          }
        } else {
          // Filter by fuel type and optionally by date range
          if (endDate === "") {
            if (startDate === "") {
              return row.fueltype === fuelTypeState;
            } else {
              return row.fueltype === fuelTypeState && daterow >= startDates;
            }
          } else if (startDate === "") {
            return row.fueltype === fuelTypeState && daterow <= endDates;
          } else {
            return (
              row.fueltype === fuelTypeState &&
              daterow >= startDates &&
              daterow <= endDates
            );
          }
        }
      })
    );
  };

  const accountData = () => {
    let totalPrice = 0;
    let totalLiter = 0;
    let totalKm = 0;
    fuelArr.forEach((element) => {
      totalPrice += parseInt(element.fuelprice);
    });
    totalKm = parseInt(fuelArr[fuelArr.length - 1].distance)-parseInt(fuelArr[0].distance)
    fuelArr.forEach(element => {
      totalLiter += parseInt(element.fuelliter)
    });
    console.log(totalLiter)
    console.log(totalKm)
    console.log(totalPrice);
    console.log(totalPrice/totalLiter)
  };

  useEffect(() => {
    backendFetchGET("/getFuels", async (response) => {
      const data = await response.json();
      setFuelType(data);
    });
  }, []);

  return (
    <>
      <Grid
        sx={{ background: "white", mt: 1, pl: "50px", pr: "50px" }}
        container
        spacing={3}
      >
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            fontWeight="fontWeightBold"
            fontSize={24}
          >
            <Typography>Yakıt Takip Sistemi</Typography>
          </Box>
        </Grid>

        {fuelArr.length === 0 ? (
          <>
            <Grid item xs={12} sx={{ marginBottom: "5vh" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography>Veri Bulunamadı</Typography>
                <Button onClick={ReturnToStart}>Basa Dön</Button>
              </Box>
            </Grid>
          </>
        ) : (
          <Grid item xs={12} sx={{ marginBottom: "5vh" }}>
            <Box>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={table_style}> Tarih</TableCell>
                      <TableCell sx={table_style}>Yakıt Turu</TableCell>
                      <TableCell sx={table_style}>Markası</TableCell>
                      <TableCell sx={table_style}>Litre</TableCell>
                      <TableCell sx={table_style}>Tl</TableCell>
                      <TableCell sx={table_style}>Arac Km</TableCell>
                      <TableCell sx={table_style}>Islemler</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fuelArr.map((fuel, index) => {
                      return (
                        <TableRow key={index} sx={{ textAlign: "center" }}>
                          <TableCell sx={column_style}>{fuel.date}</TableCell>
                          <TableCell sx={column_style}>
                            {fuel.fueltype}
                          </TableCell>
                          <TableCell sx={column_style}>
                            {fuel.stationbrand}
                          </TableCell>
                          <TableCell sx={column_style}>
                            {fuel.fuelliter}
                          </TableCell>
                          <TableCell sx={column_style}>
                            {fuel.fuelprice}
                          </TableCell>
                          <TableCell sx={column_style}>
                            {fuel.distance}
                          </TableCell>
                          <TableCell sx={table_style}>
                            <Button
                              onClick={() => DeleteFuel(fuel)}
                              sx={{ bgcolor: "#ff9e81" }}
                            >
                              Sil
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        )}

        <Grid item lg={5} sx={{display:"flex",flexDirection:"column" ,alignItems:"center", width:"100%"}} mb={"25vh"}>
          <Typography mb={2} variant="h6">Filtrele</Typography>
          <TextField
            id="date"
            label="Baslangıc Tarihi"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            sx={{marginBottom:"20px", width:"16rem"}}
          />
          <TextField
            id="date"
            label="Bitiş Tarihi"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            sx={{marginBottom:"20px",width:"16rem"}}
          />
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: "16rem", Height: 500,marginBottom:"20px" }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Akaryakıt Turu
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={fuelTypeState}
              onChange={(event) => setFuelTypeState(event.target.value)}
              label="Yakıt Turu"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {fuelType.length !== 0 &&
                fuelType.map((fuel, index) => (
                  <MenuItem key={index} value={fuel.ad}>
                    {fuel.ad}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={FuelFilterFunction}>
            Filtrele
          </Button>
          
        </Grid>
        <Grid item lg={7}>
        <Button onClick={accountData}>Hesapla</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FuelDetail;
