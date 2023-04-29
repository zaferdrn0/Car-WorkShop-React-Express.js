import React, { useEffect, useState } from "react";
import "./css/Home.css";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);
  const [repairType, setRepairType] = useState("");
  const [repairTypes, setRepairTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [district, setDistrict] = useState([]);
  const [cityName, setCityName] = useState("");
  const [dist, setDist] = useState("");

  const changeMarka = (event) => {
    const selectedBrand = event.target.value;
    setBrand(selectedBrand);
  };
  const changeRepair = (event) => {
    const selectedRepair = event.target.value;
    setRepairType(selectedRepair);
  };
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
        setDistrict(data);
      }
    );
  };
  useEffect(() => {
    getDistrict();
  }, [cityName]);

  const getRepairType = () => {
    backendFetchGET("/getRType", async (response) => {
      const data = await response.json();
      setRepairTypes(data);
      console.log(data);
    });
  };

  const changeModel = (event) => {
    const selectedBrand = event.target.value;
    setModel(selectedBrand);
    getRepairType();
  };
  useEffect(() => {}, [brands]);

  useEffect(() => {
    const getMarka = async () => {
      backendFetchGET("/getMarka", async (response) => {
        const data = await response.json();
        setBrands(data);
      });
    };
    getMarka();
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
        }
      );
    };

    getModels();
  }, [brand]);

  const navigate = useNavigate();
  const selectMarka = async () => {
    backendFetchPOST("/reqMarka", {}, async (response) => {
      const result = await response.json();
      if (result.rota === "marka") {
        let query = "city=" + cityName;
        query += "&district=" + dist;
        query += "&brand=" + brand;
        query += "&rtype=" + repairType;

        navigate("/workshops?" + query);
      }
      if (result.rota === "login") {
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    backendFetchGET("/getCity", async (response) => {
      const data = await response.json();
      setCities(data);
    });
  }, []);

  return (
    <div className="home">
      <div className="home-section-1">
        <div className="home-car-select">
          <h1>Aracını Kolay Bir Şekilde Tamir Ettir</h1>
          <h2>Aracınıza Servis Bulmakta Zorlanıyor Musunuz ?</h2>
          <p>
            Aracınız için en uygun servisleri bulup sizlerın en hızlı kolay ve
            guvenilir bir şekilde aracınızı tamir ettirmenize olanak
            sağlıyoruz...
          </p>
        </div>
        <div className="home-car-link">
          <h1>Servis Bul</h1>
          <h4>İl ve İlçe Seçiniz</h4>
          <div className="home-address">
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
            <select
              onChange={(event) => setDist(event.target.value)}
              defaultValue={""}
            >
              <option value="" disabled>
                İlce Seçiniz
              </option>
              {district.map((dist, index) => {
                return (
                  <option key={index} value={dist}>
                    {dist}
                  </option>
                );
              })}
            </select>
          </div>
          <h4>Aracınızı Seçiniz</h4>
          <select onChange={changeMarka} defaultValue={""}>
            <option value={""} disabled>
              Marka Seciniz
            </option>
            {brands.map((brand, index) => {
              return <option key={index}>{brand.ad}</option>;
            })}
          </select>
          <select onChange={changeModel} defaultValue={""}>
            <option value={""} disabled>
              Model Seciniz
            </option>
            {models.map((model, index) => {
              return <option key={index}>{model.ad}</option>;
            })}
          </select>
          <select onChange={changeRepair} defaultValue={""}>
            <option value={""} disabled>
              Tamir Turu Seciniz
            </option>
            {repairTypes.map((rType, index) => {
              return <option key={index}>{rType}</option>;
            })}
          </select>
          <button onClick={selectMarka}>Ara</button>
        </div>
      </div>
      <div className="home-section-2"></div>
    </div>
  );
};

export default Home;
