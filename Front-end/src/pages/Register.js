import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./css/Register.css";
import { context } from "../context/UserControl";

const Register = () => {
  const { loggedIn, setLoggedIn } = useContext(context);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
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
      navigate("/");
      setLoggedIn(false)
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-left">
          <h3>REGISTER</h3>
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
            Log In <a href="/login">Click</a>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Register;
