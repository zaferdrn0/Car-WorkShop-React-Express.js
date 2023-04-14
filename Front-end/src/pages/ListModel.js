import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "../components/Box";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import { useNavigate } from "react-router-dom";

const ListModel = () => {
  let params = useParams();
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);
  const navigate = useNavigate();
  const addModel = async () => {
    backendFetchPOST(
      "/addModel",
      { model: model, marka: params.marka },
      async (response) => {
        const data = await response.json();
      }
    );
  };
  useEffect(() => {
    console.log(models);
  }, [models]);
  const queryParams = new URLSearchParams({ marka: params.marka });

  useEffect(() => {
    const getModel = async () => {
      backendFetchGET(
        "/getModel?" + queryParams.toString(),
        async (response) => {
          const data = await response.json();
          await setModels(data);
        }
      );
    };
    getModel();
  }, []);

  const addUrl = (modelAdi) => {
    navigate("/marka/" + params.marka + "/" + modelAdi);
  };

  return (
    <div className="model">
      <input
        onChange={(event) => {
          setModel(event.target.value);
        }}
        placeholder="model gir"
      />
      <button onClick={addModel}>ekle</button>
      <div className="list">
        {models.map((mdl, index) => {
          return (
            <Box
              key={index}
              label={mdl.ad}
              onClick={() => {
                addUrl(mdl.ad);
              }}
            />
          );
        })}
        <div></div>
      </div>
    </div>
  );
};

export default ListModel;
