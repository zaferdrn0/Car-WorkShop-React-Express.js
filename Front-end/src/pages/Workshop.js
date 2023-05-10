import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { backendFetchGET } from "../utils/backendFetch";
import "./css/Workshop.css";
import WorkshopBox from "../components/WorkshopBox";
const Workshop = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [workshop, setWorkshop] = useState({});
  let id = searchParams.get("id");

  let queryParams = new URLSearchParams({
    id: id,
  });

  useEffect(() => {
    const getWorkshop = () => {
      backendFetchGET(
        "/getWorkshop?" + queryParams.toString(),
        async (response) => {
          const data = await response.json();
          setWorkshop(data);
        }
      );
    };
    getWorkshop();
  }, []);

  return (
    <div className="workshop-details">
      <div className="workshop-details-center">
        <WorkshopBox workshop={workshop} />
      </div>
    </div>
  );
};

export default Workshop;
