import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
const FuelAccount = () => {
  const [liter, setLiter] = useState("");
  const [distance, setDistance] = useState("");
  const [total, setTotal] = useState("");
  const [resultText, setResultText] = useState("");
  
 
  const FuelAcc = () => {
    let result;
    let fiyat;
    let litre;

    if (distance === "" || distance === "0") {
      console.log("tutarı dogru giriniz");
    } else {
      if (total !== "" || liter !== "") {
        if (total !== "" && liter === "") {
          if (!isNaN(parseFloat(total)) && !isNaN(parseFloat(distance))) {
            fiyat = parseFloat(total) / parseFloat(distance);
            result = `Aracınız Km de ${fiyat} Tl yakmaktadır.`
          }
        } else if (total === "" && liter !== "") {
          if (!isNaN(parseFloat(liter)) && !isNaN(parseFloat(distance))) {
            let road = parseFloat(distance) / 100;
            litre = parseFloat(liter) / road;
            result = `Aracınız 100Km de ${litre} litre yakıt  yakmaktadır.`
          }
        } else {
          if (!isNaN(parseFloat(liter)) && !isNaN(parseFloat(distance))) {
            let road = parseFloat(distance) / 100;
            litre = parseFloat(liter) / road;
          }
          if (!isNaN(parseFloat(total)) && !isNaN(parseFloat(distance))) {
            fiyat = parseFloat(total) / parseFloat(distance);
          }
          result = `Aracınız km de = ${fiyat} Tl ve 100 km de = ${litre} litre yakıt yakmaktadır`
        }
      } else {
        console.log("ikisi de bos");
      }
    }
    setResultText(result);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ bgcolor: "white", minHeight: 500, mt: 5, borderRadius: 4 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", mr: 10, ml: 10 }}>
        <Typography sx={{ mt: 2 }} variant="h3" component="h2">
          Yakıt Hesapla
        </Typography>
        <TextField
          sx={{ mt: 2 }}
          id="filled-basic"
          label="Aldığınız Yakıtın Litresini Giriniz"
          variant="filled"
          type="number"
          onChange={(event) => setLiter(event.target.value)}
        />
        <TextField
          sx={{ mt: 2 }}
          id="filled-basic"
          label="Aldığınız Yakıtın Tutarını Giriniz"
          variant="filled"
          type="number"
          onChange={(event) => setTotal(event.target.value)}
        />
        <TextField
          sx={{ mt: 2 }}
          id="filled-basic"
          label="Aldığınız Yakıt İle Kaç Km Yol Gittiğinizi Giriniz"
          variant="filled"
          type="number"
          onChange={(event) => setDistance(event.target.value)}
        />
        <Button
          onClick={FuelAcc}
          sx={{ mt: 2, width: 150 }}
          variant="contained"
        >
          Hesapla
        </Button>
        <Box sx={{mt:2}}>
          <p>{resultText}</p>
        </Box>
      </Box>
    </Container>
  );
};

export default FuelAccount;
