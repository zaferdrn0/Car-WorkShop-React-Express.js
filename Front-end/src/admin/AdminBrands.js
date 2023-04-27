import React, { useEffect, useState } from "react";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import TableList from "../components/TableList";

const AdminBrands = () => {
  const [brand, setBrand] = useState([]);

  const [pageState, setPageState] = useState("table");

  useEffect(() => {
    const getMarka = async () => {
      await backendFetchGET("/getMarka", async (response) => {
        const data = await response.json();
        setBrand(data);
        console.log(data);
      });
    };
    getMarka();
  }, []);

  const columnNames = ["Brand"];

  const rowValues = brand.map((brnd) => {
    return {
      [columnNames[0]]: brnd.ad,
    };
  });

  const updateBrand = (row) => {
    console.log("marka guncellendi");
    console.log(row);
  };
  const deleteBrand = (row) => {
    backendFetchPOST("/deleteBrand", { brand: row.Brand }, async (response) => {
      const data = await response.json();
      console.log(data);
    });
    const newAdminBrand = brand.filter((brand) => brand.ad !== row.Brand);
    setBrand(newAdminBrand);
  };
    const [brandSet, setbrandSet] = useState("");

    const AddBrand = () =>{
      backendFetchPOST("/addMarka", {marka: brandSet}, async (response) =>{
        const data = await response.json();
        console.log(data);
      })
      
    }

  if (pageState === "table") {
    return (
      <div >
        <div className="admin-top-header">
        <h3>Brand Control Panel</h3>
        <button
          className="ekle-admin"
          onClick={() => {
            setPageState("addUser");
          }}
        >
          Add To Brand
        </button>
        </div>
        <div className="table-admin">
        <TableList
          columnNames={columnNames}
          rowValues={rowValues}
          onUpdate={updateBrand}
          onDelete={deleteBrand}
        />
        </div>
       
      </div>
    );
  } else {
    return (
      <div className="add-admin-brand">
        <button
          onClick={() => {
            setPageState("table");
          }}
        >
          geri don
        </button>
        <div>
          <input onChange={(event) =>setbrandSet(event.target.value)} placeholder="Marka Giriniz"/>
          <button onClick={AddBrand}>Ekle</button>
        </div>
      </div>
    );
  }
};

export default AdminBrands;
