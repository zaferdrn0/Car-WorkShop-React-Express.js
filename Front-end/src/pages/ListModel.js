import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "../components/Box";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import { useNavigate } from "react-router-dom";

const ListModel = () => {
  let params = useParams();
  const [models, setModels] = useState([]);
  const navigate = useNavigate();
  
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
  if(models.length !==0){
    return (
      <div className="model">
        
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
  }
  else{
    return(
      <p>Model yok</p>
    )
 }
};

export default ListModel;
