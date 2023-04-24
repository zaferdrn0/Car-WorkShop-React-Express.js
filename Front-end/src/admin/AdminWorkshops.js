import React, { useEffect, useState } from "react";
import { backendFetchGET } from "../utils/backendFetch";

const AdminWorkshops = () => {
  const [page, setPage] = useState("table");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [repairTypes, setRepairTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState("");

  const getRepairType = () => {
    backendFetchGET("/getRType", async (response) => {
      const data = await response.json();
      setRepairTypes(data);
      console.log(data);
    });
  };

  const changeMarka = (event) => {
    const selectedBrand = event.target.value;
    setBrand(selectedBrand);
  };
  const changeModel = () => {
    getRepairType();
  };

  const getBrands = async () => {
    backendFetchGET("/getMarka", async (response) => {
      const data = await response.json();
      setBrands(data);
    });
  };
  const queryParams = new URLSearchParams({ marka: brand });
  const getModels = async () => {
    backendFetchGET("/getModel?" + queryParams.toString(), async (response) => {
      const data = await response.json();
      setModels(data);
    });
  };

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    getModels();
  }, [brand]);

  const AddWorkshop = () => {
    /* let path = image.value;
    let uzantı = path.split("\\");
    let images = uzantı[2]; */
  };

  useEffect(() => {
    backendFetchGET("/getCity", async (response) => {
      const data = await response.json();
      setCities(data);
    });
  }, []);

  const ChangeCity = (event) => {
    const selectedCity = event.target.value;
    setCityName(selectedCity);
  };
  const getDistrict = async () => {
    const queryParams = new URLSearchParams({ city: cityName });
    backendFetchGET(
      "/getDistrict?" + queryParams.toString(),
      async (response) => {
        const data = await response.json();
        console.log(data);
      }
    );
  };
  useEffect(() => {
    getDistrict();
  }, [cityName]);

  if (page === "table") {
    return (
      <div>
        <button onClick={() => setPage("addWorkshop")}>Add</button>
      </div>
    );
  } else if (page === "addWorkshop") {
    return (
      <>
        <button onClick={() => setPage("table")}>Don</button>
        <div>
          <input placeholder="Name" />
          <select onChange={ChangeCity} defaultValue={""}>
            <option value="" disabled>
              Sehir Seçiniz
            </option>
            {cities.map((city, index) => {
              return (
                <option key={index} value={city.ilAdi}>
                  {city.ilAdi}
                </option>
              );
            })}
          </select>
          <input placeholder="Image" />
          <input placeholder="phone" />
          <input placeholder="description" />
          <input placeholder="Address" />

          <button onClick={AddWorkshop}>WorkShop Add</button>
        </div>
      </>
    );
  } else if (page === "addProps") {
    return (
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
        <select onChange={changeModel} defaultValue={""}>
          <option value="" disabled>
            Model Seciniz
          </option>
          {models.map((mdl, index) => {
            return (
              <option key={index} value={mdl.ad}>
                {mdl.ad}
              </option>
            );
          })}
        </select>
        <select defaultValue={""}>
          <option value="" disabled>
            Bakım Turu Seciniz
          </option>
          {repairTypes.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>

        <button onClick={AddWorkshop}>WorkShop Add</button>
      </div>
    );
  }
};

export default AdminWorkshops;
