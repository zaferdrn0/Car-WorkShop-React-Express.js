import React, { useEffect, useState } from "react";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import TableList from "../components/TableList";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const AdminUsers = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [admin, setAdmin] = useState("");
  const [adminUsers, setAdminUsers] = useState([]);
  const [pageState, setPageState] = useState("table");
  const [userEmail, setUserEmail] = useState("");
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState("");
  const [workshopId, setWorkshopId] = useState("");
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    backendFetchGET("/getUser", async (response) => {
      const data = await response.json();
      setAdminUsers(data);
    });
  }, []);

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

  const getWorkshopFilter = async () => {
    if (cityName === "") return;
    const queryParams = new URLSearchParams({ city: cityName });
    backendFetchGET(
      "/getWorkshopFilterCity?" + queryParams.toString(),
      async (response) => {
        if (response.status === 404) return;
        const data = await response.json();
        setWorkshops(data);
      }
    );
  };

  useEffect(() => {
    getWorkshopFilter();
  }, [cityName]);

  const columnNames = ["username", "email", "phone"];

  const rowValues = adminUsers.map((user) => {
    return {
      [columnNames[0]]: user.username,
      [columnNames[1]]: user.email,
      [columnNames[2]]: user.phone,
    };
  });

  const updateUser = (row) => {
    setPageState("addWorkshop");
    setUserEmail(row.email);
  };
  const deleteUser = (row) => {
    backendFetchPOST("/deleteUser", { email: row.email }, async (response) => {
      const data = await response.json();
      console.log(data);
    });
    const newAdminUsers = adminUsers.filter((user) => user.email !== row.email);
    setAdminUsers(newAdminUsers);
  };

  const UserAdd = () => {
    backendFetchPOST(
      "/addAdminUser",
      {
        username: username,
        email: email,
        password: password,
        phone: phone,
        admin: admin,
      },
      async (response) => {
        const data = await response.json();
        console.log(data);
      }
    );
  };

  const addWorkshop = () => {
    backendFetchPOST(
      "/userAddWorkshop",
      { email: userEmail, workshopId: workshopId },
      async (response) => {
        const data = await response.json();
      }
    );
  };

  if (pageState === "table") {
    return (
      <div>
        <div className="admin-top-header">
          <h3>User Control Panel</h3>
          <button
            className="ekle-admin"
            onClick={() => {
              setPageState("addUser");
            }}
          >
            Add To User
          </button>
        </div>
        <div className="table-admin">
          {" "}
          <TableList
            columnNames={columnNames}
            rowValues={rowValues}
            onUpdate={updateUser}
            onDelete={deleteUser}
          />
        </div>
      </div>
    );
  } else if (pageState === "addUser") {
    return (
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setPageState("table");
            }}
          >
            Back
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" mb={5}>
            Add User
          </Typography>
          <TextField
            onChange={(event) => setUsername(event.target.value)}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            sx={{ marginBottom: "10px" }}
          />

          <TextField
            onChange={(event) => setEmail(event.target.value)}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ marginBottom: "10px" }}
          />

          <TextField
            onChange={(event) => setPassword(event.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            sx={{ marginBottom: "10px" }}
          />

          <TextField
            onChange={(event) => setPhone(event.target.value)}
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            sx={{ marginBottom: "10px" }}
          />

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Rol</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={admin}
              onChange={(event) => setAdmin(event.target.value)}
              autoWidth
              label="Age"
              sx={{ marginBottom: "20px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"0"}>Kullanıcı</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={UserAdd}>
            Add User
          </Button>
        </Box>
      </Grid>
    );
  } else if (pageState === "addWorkshop") {
    return (
      <Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" mb={5}>
            Workshop Add User
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 180 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              City Select
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={cityName}
              onChange={ChangeCity}
              autoWidth
              label="City Select"
              sx={{ marginBottom: "20px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {cities.map((city, index) => {
                return (
                  <MenuItem key={index} value={city.ilAdi}>
                    {city.ilAdi}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {/* <select
          onChange={(event) => setWorkshopId(event.target.value)}
          defaultValue={""}
        >
          <option value="" disabled>
            Workshop Seciniz
          </option>
          {workshops.map((workshop, index) => {
            return (
              <option key={index} value={workshop._id}>
                {workshop.name}
              </option>
            );
          })}
        </select> */}
          <FormControl sx={{ m: 1, minWidth: 180 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Workshop Select
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={workshopId}
              onChange={(event) => setWorkshopId(event.target.value)}
              autoWidth
              label="Workshop Select"
              sx={{ marginBottom: "20px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {workshops.map((workshop, index) => {
                return (
                  <MenuItem key={index} value={workshop._id}>
                    {workshop.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <Button variant="contained" onClick={addWorkshop}>
            Add User Workshop
          </Button>
        </Box>
      </Grid>
    );
  }
};

export default AdminUsers;
