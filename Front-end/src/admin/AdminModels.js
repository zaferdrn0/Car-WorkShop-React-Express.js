import React, { useEffect, useState } from "react";
import TableList from "../components/TableList";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";

const AdminModels = () => {
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [model, setModel] = useState("");
  const [pageState, setPageState] = useState("table");
  const getBrands = async () => {
    backendFetchGET("/getMarka", async (response) => {
      const data = await response.json();
      setBrands(data);
    });
  };

  const changeMarka = (event) => {
    const selectedBrand = event.target.value;
    setBrand(selectedBrand);
  };

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    // URLSearchParams oluşturmak için marka durumunu kullan
    const queryParams = new URLSearchParams({ marka: brand });
    const getModels = async () => {
      backendFetchGET(
        "/getModel?" + queryParams.toString(),
        async (response) => {
          const data = await response.json();
          setModels(data);
          console.log(data);
        }
      );
    };

    getModels();
  }, [brand]);

  const columnNames = ["Model"];

  const rowValues = models.map((brnd) => {
    return {
      [columnNames[0]]: brnd.ad,
    };
  });

  const updateModel = (row) => {
    console.log("marka guncellendi");
    console.log(row);
  };
  const deleteModel = (row) => {
   backendFetchPOST("/deleteModel", {marka:brand, model: row.Model},async (response) =>{
    const data = await response.json();
    console.log(data);
  
  })
  };
  

  const AddModel = () =>{
    backendFetchPOST("/addModel", {marka:brand, model: model}, async (response) =>{
      const data = await response.json();
      console.log(data);
    })
  }
  

  

  if (pageState === "table") {
    return (
      <div className="table-admin">
        <select onChange={changeMarka} defaultValue={""}>
          <option value="" disabled>
            Marka Seçiniz
          </option>
          {brands.map((brnd, index) => {
            return (
              <option key={index} value={brnd.ad}>
                {brnd.ad}
              </option>
            );
          })}
        </select>
        <button
          className="ekle-admin"
          onClick={() => {
            setPageState("addModel");
          }}
        >
          ekle
        </button>
        <TableList
          columnNames={columnNames}
          rowValues={rowValues}
          onUpdate={updateModel}
          onDelete={deleteModel}
        />
      </div>
    );
  } else {
    return (
      <div>
        <p>marka ekleniyor burada</p>
        <button
          onClick={() => {
            setPageState("table");
          }}
        >
          geri don
        </button>
        <div>
        <select onChange={changeMarka} defaultValue={""}>
          <option value="" disabled>
            Marka Seçiniz
          </option>
          {brands.map((brnd, index) => {
            return (
              <option key={index} value={brnd.ad}>
                {brnd.ad}
              </option>
            );
          })}
        </select>
          <input onChange={(event) =>setModel(event.target.value)} type="text" placeholder="Model Giriniz"/>
       <button onClick={AddModel} > Model Ekle</button>
        </div>
   
      </div>
    );
  }
};

export default AdminModels;
