import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { backendFetchGET } from "../utils/backendFetch";
import BoxList from "../components/BoxList";
import "./css/opps.css"

const ListWorkshop = () => {
  const [workshop, setWorkshop] = useState([]);

  let [searchParams, setSearchParams] = useSearchParams();
  let brand = searchParams.get("brand");
  let rtype = searchParams.get("rtype");
  let city = searchParams.get("city");
  let district = searchParams.get("district");
  let queryParams = new URLSearchParams({
    brand: brand,
    rtype: rtype,
    city: city,
    district: district,
  });

  useEffect(() => {
    backendFetchGET(
      "/getFilterWorkshop?" + queryParams.toString(),
      async (response) => {
        const data = await response.json();
        setWorkshop(data);
        console.log(data);
      }
    );
  }, []);

  if (workshop.length !== 0) {
    return (
      <div>
        <div className="workshop-list-container">
          <h1>Aracınıza Uygun Servisler</h1>
          <div className="workshop-list">
            {workshop.map((item) => (
              <BoxList
                key={item._id}
                name={item.name}
                image={item.image}
                address={
                  item.address.city +
                  " " +
                  item.address.distict +
                  " " +
                  item.address.address
                }
                phone={item.phone}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="workshop-error-container">
        <img
          src="./images/Opps.png"
          alt="Opps!"
          width="400px"
        />
        <h1>Opps! Uygun Servis Bulunamadı</h1>
        <p>
          Maalesef aradığınız özelliklere sahip bir servis bulunamadı. Lütfen
          daha sonra tekrar deneyin ya da bizi arayarak destek alın.
        </p>
       <a href="/"><button>ANA SAYFAYA GERİ DÖN</button></a> 
      </div>
    );
  }
};

export default ListWorkshop;
