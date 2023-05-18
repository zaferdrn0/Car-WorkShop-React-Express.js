import { createContext, useEffect, useState } from "react";
import { backendFetchGET } from "../utils/backendFetch";
import React from 'react';

export const context = createContext();

export const LoginProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

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

  return (
    <context.Provider value={{ loggedIn, setLoggedIn }}>
      {props.children}
    </context.Provider>
  );
};
