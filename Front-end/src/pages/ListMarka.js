import React, { useEffect, useState } from "react";
import { backendFetchPOST } from "../utils/backendFetch";
import Box from "../components/Box";
import { backendFetchGET } from "../utils/backendFetch";
import "./css/ListMarka.css";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const ListMarka = () => {
  const [marka, setMarka] = useState("");
  const [markas, setMarkas] = useState([]);

  const addMarka = async () => {
    backendFetchPOST("/addMarka", { marka: marka }, async (response) => {
      const data = await response.json();
      console.log(data);

      setMarkas((prev) => {
        return [...prev, marka];
      });
    });
  };

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
      <input
        onChange={(event) => {
          setMarka(event.target.value);
        }}
        placeholder="marka ekle"
      />
      <button onClick={addMarka}>ekle</button>
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
