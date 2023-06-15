import React, { useEffect, useState } from "react";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import Button from "@mui/material/Button";
import { Alert, Box, Grid, Snackbar, TextField, Typography } from "@mui/material";

const WorkshopEdit = () => {
  const [addressDescription, setAddressDescription] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [worktimeStart, setWorktimeStart] = useState("");
  const [worktimeEnd, setWorktimeEnd] = useState("");
  const [email, setEmail] = useState("");
  const [webSite, setWebSite] = useState("");
  const [workshop, setWorkshop] = useState([]);
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [imageAdd, setImageAdd] = useState(false);

  const imagePage = () => {
    setImageAdd(true);
  };
  const addImage = () => {
    let path = image;
    let uzantı = path.split("\\");
    let images = uzantı[2];
    backendFetchPOST(
      "/workshopImageAdd",
      { image: images, id: workshop._id },
      async (response) => {
        const data = await response.json();
        console.log(data);
      }
    );
  };

  const Update = () => {
    backendFetchPOST(
      "/userUpdateWorkshop",
      {
        addressDescription: addressDescription,
        description: description,
        phone: phone,
        worktimeStart: worktimeStart,
        worktimeEnd: worktimeEnd,
        email: email,
        website: webSite,
      },
      async (response) => {
        const data = await response.json();
        console.log(data);
      }
    );
    setOpen(true);
    setTimeout(function () {
      setOpen(false);
    }, 5000);
  };

  useEffect(() => {
    try {
      backendFetchGET("/getUserWorkshop", async (response) => {
        if (response.status !== 200) return;
        const data = await response.json();
        setWorkshop(data);
        setAddressDescription(data.address.description);
        setDescription(data.description);
        setPhone(data.phone);
        setWorktimeStart(data.workingHours.start);
        setWorktimeEnd(data.workingHours.end);
        setEmail(data.email);
        setWebSite(data.website);
      });
    } catch {}
  }, []);

  if (imageAdd === false) {
    return (
      <Grid>
      
        <Grid sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <Typography variant="h4">{workshop.name}</Typography>
          <TextField
            sx={{ mt: 3 }}
            id="filled-multiline-static"
            label="Workshop Description"
            multiline
            rows={4}
            defaultValue="Description"
            value={description}
            variant="outlined"
            onChange={(event) => setDescription(event.target.value)}
          />
          <TextField
            sx={{ mt: 3, mb:2 }}
            id="filled-multiline-static"
            label="Workshop Address Description"
            multiline
            rows={4}
            value={addressDescription}
            variant="outlined"
            onChange={(event) => setAddressDescription(event.target.value)}
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
            label="E-Mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            sx={{ mb: 2 }}
            id="outlined-multiline-flexible"
            label="Web Site"
            value={webSite}
            onChange={(event) => setWebSite(event.target.value)}
          />
          <Box sx={{display:"flex",alignItems:"center"}}>
            <Box mr={1} sx={{display:"flex",flexDirection:"column"}}>
              <Typography>Workshop Start Time</Typography>
            <TextField
            sx={{ mb: 2 }}
            id="outlined-multiline-flexible"
            value={worktimeStart}
            type="time"
            onChange={(event) => setWorktimeStart(event.target.value)}
          />
            </Box>
            <Box ml={1} sx={{display:"flex",flexDirection:"column"}}>
            <Typography>Workshop Close Time</Typography>
          <TextField
            sx={{ mb: 2 }}
            id="outlined-multiline-flexible"
            type="time"
            value={worktimeEnd}
            onChange={(event) => setWorktimeEnd(event.target.value)}
          />
          </Box>
          
          </Box>
          <Box sx={{display:"flex",alignItems:"center", justifyContent:"center"}}>
          <Button
            sx={{ mr:5 }}
            onClick={Update}
            variant="contained"
            
          >
            Update
          </Button>
          <Button variant="contained" onClick={imagePage} color="success">
          Resim Ekle
        </Button>
          </Box>
         
          
          <Snackbar open={open}>
            <Alert severity="success" sx={{ width: "100%", fontSize: 20 }}>
              Servis Basarıyla Guncellendi
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <>
        <h4>Image Add</h4>
        <input
          onChange={(event) => setImage(event.target.value)}
          id="productImage"
          name="resim"
          type="file"
        />
        <button onClick={addImage}>Image Add</button>
      </>
    );
  }
};

export default WorkshopEdit;
