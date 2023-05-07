import React, { useEffect, useState } from "react";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import TableList from "../components/TableList";

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
  const [workshopId,setWorkshopId] = useState("");
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    backendFetchGET("/getUser", async (response) => {
      const data = await response.json();
      setAdminUsers(data);
      console.log(data);
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
    setUserEmail(row.email)
    
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

  const addWorkshop = () =>{
      backendFetchPOST("/userAddWorkshop", {email:userEmail, workshopId:workshopId}, async (response) =>{
        const data = await response.json();
      })
  }

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
  } else if(pageState ==="addUser") {
    return (
      <div className="admin-user-add">
        <button
          onClick={() => {
            setPageState("table");
          }}
        >
          geri don
        </button>
        <div>
          <p>kullanıcı ekleniyor burada</p>
          <input
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
          />
          <input
            onChange={(event) => setPhone(event.target.value)}
            type="text"
            placeholder="Phone"
          />
          <select
            defaultValue={""}
            onChange={(event) => setAdmin(event.target.value)}
          >
            <option value="" disabled>
              Rol Seciniz
            </option>
            <option value={"admin"}>Admin</option>
            <option value={"0"}>Kullanıcı</option>
          </select>
          <button onClick={UserAdd}>Kullanıcı Ekle</button>
        </div>
      </div>
    );
  }else if(pageState === "addWorkshop"){
    return(<div>
      

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
<select onChange={(event) =>setWorkshopId(event.target.value)} defaultValue={""}>
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
</select>


      <button onClick={addWorkshop}>Workshop ekle</button>
    </div>)
  }
};

export default AdminUsers;
