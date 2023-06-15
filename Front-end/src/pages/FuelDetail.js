import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
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
  const [totalPrice, setTotalPrice] = useState();
  const [totalLiter, setTotalLiter] = useState();
  const [totalKm, setTotalKm] = useState();
  const [displayState, setDisplayState] = useState("none");

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
    backgroundColor: "#0077ff",
    textAlign: "center",
  };
  const column_style = {
    textAlign: "center",
  };

  const ReturnToStart = () => {
    setFuelArr(fuels);
    setDisplayState("none");
  };

  const FuelFilterFunction = async () => {
    setDisplayState("none");
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
    setDisplayState("block");
    if (fuelArr.length === 0) return;
    let price = 0;
    let liter = 0;
    let km = 0;

    fuelArr.forEach((element) => {
      price += parseInt(element.fuelprice);
    });
    km =
      parseInt(fuelArr[fuelArr.length - 1].distance) -
      parseInt(fuelArr[0].distance);
    fuelArr.forEach((element) => {
      liter += parseInt(element.fuelliter);
    });

    setTotalPrice(price);
    setTotalLiter(liter);
    setTotalKm(km);
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
        sx={{
          background: "#f0f8ff",
          mt: 1,
          pl: "50px",
          pr: "50px",
          height: "90vh",
        }}
        container
        spacing={3}
      >
        {fuelArr.length === 0 ? (
          <>
            <Grid item lg={7} sm={12} sx={{ marginBottom: "2vh" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography>Veri Bulunamadı</Typography>
                <Button onClick={ReturnToStart}>Basa Dön</Button>
                <img src="./images/Opps.png" alt="Opps!" width="400px" />
              </Box>
            </Grid>
          </>
        ) : (
          <Grid
            item
            md={12}
            sm={12}
            xs={12}
            lg={8}
            sx={{ marginBottom: "1vh" }}
          >
            <Typography sx={{ mb: 2 }} variant="h4">
              Yakıt Takip
            </Typography>
            <TableContainer sx={{ height: "450px" }}>
              <Table stickyHeader aria-label="simple table">
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
                        <TableCell sx={column_style}>{fuel.fueltype}</TableCell>
                        <TableCell sx={column_style}>
                          {fuel.stationbrand}
                        </TableCell>
                        <TableCell sx={column_style}>
                          {fuel.fuelliter}
                        </TableCell>
                        <TableCell sx={column_style}>
                          {fuel.fuelprice}
                        </TableCell>
                        <TableCell sx={column_style}>{fuel.distance}</TableCell>
                        <TableCell sx={column_style}>
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
          </Grid>
        )}

        <Grid
          item
          lg={4}
          sm={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "480px",
            mt: 6,
          }}
          mb={"1vh"}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "30px",
              borderRadius: "10px",
            }}
          >
            <Typography mb={2} variant="h6">
              Filtrele
            </Typography>
            <TextField
              id="date"
              label="Baslangıc Tarihi"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              sx={{ marginBottom: "20px", width: "16rem" }}
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
              sx={{ marginBottom: "20px", width: "16rem" }}
            />
            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: "16rem",
                Height: 500,
                marginBottom: "20px",
              }}
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
            <Button
              color="success"
              sx={{ mt: 3 }}
              variant="contained"
              onClick={accountData}
            >
              Hesapla
            </Button>
          </Card>
        </Grid>
        <Grid
          sx={{ display: "flex", justifyContent: "center" }}
          item
          lg={4}
          sm={4}
        >
          <Card
            sx={{
              minHeight: "100px",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              marginBottom: "5vh",
              minWidth: "380px",
              padding: 4,
              display: displayState,
            }}
          >
            <Box>
              <Typography mb={2} fontWeight={600} variant="h5">
                Hesaplanan Yakıt Değerleri
              </Typography>
              <Box sx={{ display: "flex", mb: "15px" }}>
                <Typography sx={{ fontWeight: "700" }}>
                  Toplam Yapılan Km :{" "}
                </Typography>
                <Typography>{totalKm}</Typography>
              </Box>

              <Box sx={{ display: "flex", mb: "15px" }}>
                <Typography sx={{ fontWeight: "700" }}>
                  Alınan Toplam Yakıt Litresi :{" "}
                </Typography>
                <Typography>{totalLiter}</Typography>
              </Box>

              <Box sx={{ display: "flex", mb: "15px" }}>
                <Typography sx={{ fontWeight: "700" }}>
                  Yakıta Verilen Para :{" "}
                </Typography>
                <Typography>{totalPrice}</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default FuelDetail;
