import React, { useEffect, useState } from "react";
import TableList from "../components/TableList";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import { Button, TextField } from "@mui/material";

const AdminRepairType = () => {
  const [rtypes, setRtypes] = useState([]);
  const [pageState, setPageState] = useState("table");
  const [repairType, setRepairType] = useState("");

  useEffect(() => {
    const getRtype = () => {
      backendFetchGET("/getRType", async (response) => {
        const data = await response.json();
        setRtypes(data);
      });
    };
    getRtype();
  }, []);

  const columnNames = ["Repair"];

  const rowValues = rtypes.map((type) => {
    return {
      [columnNames[0]]: type,
    };
  });

  const updateType = (row) => {
    console.log("marka guncellendi");
    console.log(row);
  };
  const deleteType = (row) => {
    backendFetchPOST(
      "/deleteRType",
      { rType: row.Repair },
      async (response) => {
        const data = await response.json();
        console.log(data);
      }
    );
    const newRepairType = rtypes.filter((type) => type !== row.Repair);
    setRepairType(newRepairType);
  };

  const AddRepairType = () => {
    backendFetchPOST("/addRType", { rType: repairType }, async (response) => {
      const data = await response.json();
      console.log(data);
    });
  };

  if (pageState === "table") {
    return (
      <div>
        <div className="admin-top-header">
          <h3>Repair Type Control Page</h3>
          <button
            className="ekle-admin"
            onClick={() => {
              setPageState("addUser");
            }}
          >
            Add To Repair
          </button>
        </div>
        <div className="table-admin">
          <TableList
            columnNames={columnNames}
            rowValues={rowValues}
            onUpdate={updateType}
            onDelete={deleteType}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        <div className="admin-top-header">
          <h3>Gas Station Control Panel</h3>
          <button
            onClick={() => {
              setPageState("table");
            }}
          >
           Back
          </button>
        </div>
        <div>
          <TextField
            sx={{ mb: 2 }}
            id="standard-basic"
            label="Repair Type"
            variant="standard"
            value={repairType}
            onChange={(event) => setRepairType(event.target.value)}
          />
        </div>
        <div>
          <Button onClick={AddRepairType} variant="contained">
            ADD Repair Type
          </Button>
        </div>
      </div>
    );
  }
};

export default AdminRepairType;
