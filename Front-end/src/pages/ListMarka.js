import React, { useEffect, useState } from "react";
import { backendFetchPOST } from "../utils/backendFetch";
import Box from "../components/Box";
import { backendFetchGET } from "../utils/backendFetch";
import "./css/ListMarka.css";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const ListMarka = () => {

  const [markas, setMarkas] = useState([]);

  

  useEffect(() => {
    console.log(markas);
  }, [markas]);

  useEffect(() => {
    const getMarka = async () => {
      backendFetchGET("/getMarka", async (response) => {
        const data = await response.json();

        setMarkas(data);
      });
    };
    getMarka();
  }, []);

  const navigate = useNavigate();

  function verilecekOnClick(markaAdi) {
    navigate("/marka/" + markaAdi);
  }

  return (
    <div>
      
      
      <div className="list">
        {markas.map((mrk, index) => {
          return (
            <Box
              key={index}
              label={mrk.ad}
              onClick={() => {
                verilecekOnClick(mrk.ad);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListMarka;
