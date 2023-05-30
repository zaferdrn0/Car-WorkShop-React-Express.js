import React, { useEffect, useState } from "react";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import Button from "@mui/material/Button";
import "../workshopAdmin/css/workshopEdit.css"
import { Alert, Snackbar } from "@mui/material";

const WorkshopEdit = () => {
  const [addressDescription, setAddressDescription] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [worktimeStart, setWorktimeStart] = useState("");
  const [worktimeEnd, setWorktimeEnd] = useState("");
  const [email, setEmail] = useState("");
  const [webSite,setWebSite] = useState("");
  const [workshop, setWorkshop] = useState([]);
  const [open, setOpen] = useState(false);

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
        website:webSite,
      },
      async (response) => {
        const data = await response.json();
        console.log(data);
        
      }
    );
    setOpen(true)
        setTimeout(function(){setOpen(false)},5000)
  };

  useEffect(() => {
    try {
      backendFetchGET("/getUserWorkshop", async (response) => {
        const data = await response.json();
        setWorkshop(data);
        setAddressDescription(data.address.description);
        setDescription(data.description);
        setPhone(data.phone);
        setWorktimeStart(data.workingHours.start);
        setWorktimeEnd(data.workingHours.end);
        setEmail(data.email);
        setWebSite(data.website)
      });
    } catch {}
  }, []);

  return (
    <div className="workshop-user">
      <div>
        <h1>{workshop.name}</h1>
      </div>
      <div className="workshop-user-control">
      <div className="workshop-user-textarea">
     
        <div>
          <h3>Dukkan acıklaması</h3>{" "}
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            ></textarea>
        </div>
        <div>
          <h3>Adres Acıklaması</h3>
          <textarea
            value={addressDescription}
            onChange={(event) => setAddressDescription(event.target.value)}
            placeholder="Adresin kolay olarak bulunması için tarif girin"
          ></textarea>
        </div>
        </div>
        <div className="workshop-user-edit">
        <div>
          <h3>Telefon</h3>{" "}
          
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div>
          <h3>E-Posta</h3>
          <input onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
          <h3>Web Site</h3>
          <input onChange={(event) => setWebSite(event.target.value)} />
        </div>
        <div>
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
        </div>
        
        </div>
        
        </div>
        <div>
          <Button  sx= {{mt:4,width:200,height:60,fontSize:20}} onClick={Update} variant="contained" color="success">
           Ekle
          </Button>
        </div>
        <Snackbar open={open}  >
  <Alert    severity="success" sx={{ width: '100%', fontSize:20 }}>
    Servis Basarıyla Guncellendi
  </Alert>
</Snackbar>
    </div>
  );
};

export default WorkshopEdit;
