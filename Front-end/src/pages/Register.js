import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Register.css";
import { context } from "../context/UserControl";
import { Alert, Box, CircularProgress } from "@mui/material";

const Register = () => {
  const {  setLoggedIn } = useContext(context);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [succesAlert,setSuccesAlert] = useState("none")
  const [errorAlert, setErrorAlert] = useState("none")
  const [loading,setLoading] = useState("none")
  const navigate = useNavigate();


  const register = async () => {
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        phone: phone,
      }),
    });

    const result = await response.json();
    if (result.rota === "home") {
      setErrorAlert("none")
      setSuccesAlert("inline-flex")
      setLoading("flex")
      setTimeout(function(){
        setLoggedIn(true);
        navigate("/");
      },2000)
    
    }else{
      setSuccesAlert("none")
      setErrorAlert("inline-flex")
      setTimeout(function(){setErrorAlert("none")},3000)
    }
  };

  const keydown = (event) =>{
    if (event.key === "Enter") {
      register()
    }
  }

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-left">
          <h3>REGISTER</h3>
          <input onKeyDown={keydown}
            type="text"
            placeholder="Kullanıcı Adı Giriniz"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input onKeyDown={keydown}
            type="text"
            placeholder="E-Mail Giriniz"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input onKeyDown={keydown}
            type="password"
            placeholder="Sifrenizi Giriniz"
            onChange={(event) => setPassword(event.target.value)}
          />
          <input onKeyDown={keydown}
            type="tel"
            placeholder="Telefon Giriniz"
            onChange={(event) => setPhone(event.target.value)}
          />
          <button onClick={register}>SIGN IN</button>
          <h4>
            Log In <Link to="/login">Click</Link>
          </h4>
          <Alert
              sx={{ mt: 4, color: "white",display:succesAlert,}}
              variant="outlined"
              severity="success"
              hidden = {errorAlert}
            >
              Basarıyla Kayıt Oldunuz
            </Alert>
            <Alert sx={{  mt: 4, color: "white", display:errorAlert }} variant="outlined" severity="error">
              Hatalı Girdiniz
            </Alert>
            <Box sx={{display: loading,mt:5 }}>
      <CircularProgress size={50} />
    </Box>
        </div>
      </div>
    </div>
  );
};

export default Register;
