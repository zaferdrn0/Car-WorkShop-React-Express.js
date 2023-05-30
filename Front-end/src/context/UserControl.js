import { createContext, useEffect, useState } from "react";
import { backendFetchGET } from "../utils/backendFetch";
import React from "react";

export const context = createContext();

export const LoginProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState("");
  const [city,setCity] = useState([]);

  useEffect(() => {
    const checkUserLogin = async () => {
      backendFetchGET("/reqUserLogin", async (response) => {
        const data = await response.json();
        if (data.rota === "session") {
          setLoggedIn(true);  
        }
        if (data.rota === "login") {
          setLoggedIn(false);
        }
      });
    };

   checkUserLogin();
  }, []);

  useEffect(() => {
    const backendGetUser = async () => {
      backendFetchGET("/user", async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setUser(data);
        }
      });
    };
    backendGetUser();
  }, []);



  useEffect(() =>{
      backendFetchGET("/getCity", async (response) =>{
          const data = await response.json();
          setCity(data);
          
      })
  },[])


  return (
    <context.Provider value={{ loggedIn, setLoggedIn, user, setUser,city  }}>
      {props.children}
    </context.Provider>
  );
};
