import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./css/Register.css"

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        credentials : "include",
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
      if(result.rota === "home"){
        navigate("/")
      }
  
    
  };

  return (
    <div className="register">
      <Header />
      <div className="register-container">
        <div className="register-left">
          <h3>Register</h3>
          <input
            type="text"
            placeholder="Kullanıcı Adı Giriniz"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            placeholder="E-Mail Giriniz"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Sifrenizi Giriniz"
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type="tel"
            placeholder="Telefon Giriniz"
            onChange={(event) => setPhone(event.target.value)}
          />
          <button onClick={register}>SIGN IN</button>
          <h4>
            Log In <a>Click</a>
          </h4>
        </div>
        <div className="register-right">
          <img src="./images/RepairPhoto.png" alt="fotograf" />
        </div>
      </div>
    </div>
  );
};

export default Register;
