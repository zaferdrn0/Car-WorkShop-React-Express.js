import React, { useEffect, useState } from "react";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import Button from "@mui/material/Button";
import { Alert, Grid, Snackbar, TextField } from "@mui/material";

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
        <Grid>
        <TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
        />
          <h1>{workshop.name}</h1>
          <button onClick={imagePage}>Resim Ekle</button>
        
 
              <h3>Dukkan acıklaması</h3>{" "}
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
         
              <h3>Adres Acıklaması</h3>
              <textarea
                value={addressDescription}
                onChange={(event) => setAddressDescription(event.target.value)}
                placeholder="Adresin kolay olarak bulunması için tarif girin"
              ></textarea>
          
              <h3>Telefon</h3>{" "}
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
           
              <h3>E-Posta</h3>
              <input onChange={(event) => setEmail(event.target.value)} />
          
              <h3>Web Site</h3>
              <input onChange={(event) => setWebSite(event.target.value)} />
           
              <h3>Çalısma Saati</h3> <h4>Acılıs</h4>
              <input
                value={worktimeStart}
                onChange={(event) => setWorktimeStart(event.target.value)}
              />
              <h4>Kapanıs</h4>
              <input
                value={worktimeEnd}
                onChange={(event) => setWorktimeEnd(event.target.value)}
              />
         
       
          <Button
            sx={{ mt: 4, width: 200, height: 60, fontSize: 20 }}
            onClick={Update}
            variant="contained"
            color="success"
          >
            Ekle
          </Button>
       
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
        <button onClick={addImage}>Ekle</button>
      </>
    );
  }
};

export default WorkshopEdit;
