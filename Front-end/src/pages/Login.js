import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import { backendFetchPOST } from "../utils/backendFetch";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const userLogin = async () => {
    backendFetchPOST(
      "/login",
      { email: email, password: password },
      async (response) => {
        const result = await response.json();
        if (result.yonlendir === "1") {
          navigate("/");
        }
      }
    );
  };

  return (
    <div className="login">
      <Header />
      <div className="login-container">
        <div className="login-left">
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="text"
            placeholder="E-Mail Giriniz"
          />
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Sifrenizi Giriniz"
          />
          <button onClick={userLogin}>LOG IN</button>
          <h4>
            Register <a>Click</a>
          </h4>
        </div>
        <div className="login-right">
          <img src="./images/RepairPhoto.png" alt="fotograf" />
        </div>
      </div>
    </div>
  );
};

export default Login;
