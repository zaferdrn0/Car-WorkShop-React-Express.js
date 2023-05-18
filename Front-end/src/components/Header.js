import React, { useContext, useEffect, useState } from "react";
import "./css/header.css";
import { context } from "../context/UserControl";
import { backendFetchGET } from "../utils/backendFetch";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const { loggedIn, setLoggedIn } = useContext(context);
  const [admin, setAdmin] = useState("");
  const [workshopControl, setWorkshopControl] = useState("")
  const navigate = useNavigate();
  
  const LogOut = () =>{
      backendFetchGET("/logout", async (response) =>{
        const data = await response.json();
        if(response.status === 202){
          setLoggedIn(false)
          navigate("/")
        }
      })

  }
  useEffect(() =>{
    backendFetchGET("/user", async (response) =>{
    try{
      const data = await response.json()
      
      
      
        if(data.admin === "admin"){
          setAdmin("admin")
        }
        if(data.workshop !== "null"){
          setWorkshopControl("workshop")
        }
    }catch(err){
      console.log(err)
    }
      
    })
  },[loggedIn])

  if (loggedIn === false) {
    return (
      <div className="header">
        <div className="header-container">
          <div className="header-left">
            <a href="/">
              <img src="/images/logo.png" alt="logo" />
            </a>
            <a className="servis" href="/">
              <h5>Servis Bulmak İçin Tıklanıyız</h5>{" "}
            </a>
            <a className="dukkan">
              {" "}
              <h5>Yakıt Hesapla</h5>
            </a>
          </div>
          <div className="header-right">
            <a href="/login">
              <h5>Giriş Yap</h5>
            </a>
            <a href="/register">
              <h5>Kayıt Ol</h5>
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    if(admin === "admin"){
      return (
        <div className="header">
        <div className="header-container">
          <div className="header-left">
            <a href="/">
              <img src="./images/logo.png" alt="logo" />
            </a>
            <a className="servis" href="/">
              <h5>Servis Bulmak İçin Tıklanıyız</h5>{" "}
            </a>
            <a
              href="/workshops?city=&district=&brand=&rtype="
              className="dukkan"
            >
              {" "}
              <h5>Servisler</h5>
            </a>
            <a className="dukkan">
              {" "}
              <h5>Yakıt Hesapla</h5>
            </a>
          </div>
          <div className="header-right">
          <a href="/admin">
              <h5>Admin</h5>
            </a>
         <button className="logOut-btn" onClick={LogOut}><h3>Cikis Yap</h3> </button>
          </div>
        </div>
      </div>
      )
    }
    if(workshopControl === "workshop"){
      return (
        <div className="header">
        <div className="header-container">
          <div className="header-left">
            <a href="/">
              <img src="./images/logo.png" alt="logo" />
            </a>
            <a className="servis" href="/">
              <h5>Servis Bulmak İçin Tıklanıyız</h5>{" "}
            </a>
            <a
              href="/workshops?city=&district=&brand=&rtype="
              className="dukkan"
            >
              {" "}
              <h5>Servisler</h5>
            </a>
            <a className="dukkan">
              {" "}
              <h5>Yakıt Hesapla</h5>
            </a>
          </div>
          <div className="header-right">
          <a href="/workshopadmin">
              <h5>Workshop</h5>
            </a>
         <button className="logOut-btn" onClick={LogOut}><h3>Cikis Yap</h3> </button>
          </div>
        </div>
      </div>
      )
    }
    else{
      return (
        <div className="header">
        <div className="header-container">
          <div className="header-left">
            <a href="/">
              <img src="./images/logo.png" alt="logo" />
            </a>
            <a className="servis" href="/">
              <h5>Servis Bulmak İçin Tıklanıyız</h5>{" "}
            </a>
            <a
              href="/workshops?city=&district=&brand=&rtype="
              className="dukkan"
            >
              {" "}
              <h5>Servisler</h5>
            </a>
            <a className="dukkan">
              {" "}
              <h5>Yakıt Hesapla</h5>
            </a>
          </div>
          <div className="header-right">
            
         <button className="logOut-btn" onClick={LogOut}> <h3>Cikis Yap</h3></button>
          </div>
        </div>
      </div>
      )
    }
    
  }
};

export default Header;
