import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Login.css";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import { context } from "../context/UserControl";
import Alert from "@mui/material/Alert";
import { Box, Button, CircularProgress } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn } = useContext(context);
  const [succesAlert, setSuccesAlert] = useState("none");
  const [errorAlert, setErrorAlert] = useState("none");
  const [loading, setLoading] = useState("none");
  const [googleUrl,setGoogleUrl] = useState("");

  const navigate = useNavigate();

  const userLogin = async () => {
    backendFetchPOST(
      "/login",
      { email: email, password: password },
      async (response) => {
        const result = await response.json();
        if (result.yonlendir === "1") {
          setErrorAlert("none");
          setSuccesAlert("inline-flex");
          setLoading("flex");
          setTimeout(function () {
            setLoggedIn(true);
            navigate("/");
          }, 2000);
        } else {
          setSuccesAlert("none");
          setErrorAlert("inline-flex");
          setTimeout(function () {
            setErrorAlert("none");
          }, 3000);
        }
      }
    );
  };
  const keydown = (event) => {
    if (event.key === "Enter") {
      userLogin();
    }
  };

  useEffect(() => {
    backendFetchGET("/googleLoginUrl", async (response) => {
      const data = await response.json();
      setGoogleUrl(data.message);
      console.log(data.message)
    });
  });

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-left">
          <h3>LOGIN</h3>
          <input
            onKeyDown={keydown}
            onChange={(event) => setEmail(event.target.value)}
            type="text"
            placeholder="E-Mail Giriniz"
          />
          <input
            onKeyDown={keydown}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Sifrenizi Giriniz"
          />
          <button onClick={userLogin}>LOG IN</button>
           <Box sx={{height:"120px"}}>
           <Link to={googleUrl}> <img style={{height:"100px"}} src="/images/googleLogo.png" alt="logo" /></Link>
           </Box>
          
          <h4>
            Register <Link to="/register">Click</Link>
          </h4>
          <Alert
            sx={{ mt: 4, color: "white", display: succesAlert }}
            variant="outlined"
            severity="success"
            hidden={errorAlert}
          >
            Basarıyla Giris Yaptınız
          </Alert>
          <Alert
            sx={{ mt: 4, color: "white", display: errorAlert }}
            variant="outlined"
            severity="error"
          >
            Hatalı Giris Yaptınız
          </Alert>
          <Box sx={{ display: loading, mt: 5 }}>
            <CircularProgress size={50} />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Login;
