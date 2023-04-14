import React, { useEffect, useState } from "react";
import { backendFetchGET } from "../utils/backendFetch";

const ListWorkshop = () => {
  const url = window.location.pathname;
  const parts = url.split("/");
  const result = parts.slice(2).join("/");
  console.log(result);
  const queryParams = new URLSearchParams({ url: result });

  const [workshop, setWorkshop] = useState([]);

  useEffect(() => {
    backendFetchGET(
      "/getWorkshop?" + queryParams.toString(),
      async (response) => {
        const data = await response.json();
        setWorkshop(data);
      }
    );
  }, []);
  return <div>ListWorkshop</div>;
};

export default ListWorkshop;
