import React, { useEffect, useState } from "react";
import "../utils/backendFetch";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import Box from "../components/Box";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const RepairType = () => {
  let params = useParams();
  const [rType, setRType] = useState("");
  const [Types, setTypes] = useState([]);
  const navigate = useNavigate();
  const addRType = () => {
    backendFetchPOST("/addRType", { rType: rType }, async (response) => {
      const data = await response.json();
      console.log(data);
    });
  };

  useEffect(() => {
    backendFetchGET("/getRType", async (response) => {
      const data = await response.json();
      setTypes(data);
    });
  });

  const addUrl = (type) => {
    navigate("/marka/" + params.marka + "/" + params.model + "/" + type);
  };

  return (
    <div className="repairType">
      <div>
        <input
          onChange={(event) => {
            setRType(event.target.value);
          }}
          placeholder="type Gir"
        />
        <button onClick={addRType}>ekle</button>
      </div>
      <div className="list">
        {Types.map((type, index) => {
          return (
            <Box
              key={index}
              label={type}
              onClick={() => {
                addUrl(type);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RepairType;
