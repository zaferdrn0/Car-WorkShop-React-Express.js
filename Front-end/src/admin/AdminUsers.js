import React, { useEffect, useState } from "react";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import TableList from "../components/TableList";

const AdminUsers = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [pageState, setPageState] = useState("table");

  useEffect(() => {
    backendFetchGET("/getAdminUser", async (response) => {
      const data = await response.json();
      setAdminUsers(data);
      console.log(data);
    });
  }, []);

  const columnNames = ["username", "email", "phone"];

  const rowValues = adminUsers.map((user) => {
    return {
      [columnNames[0]]: user.username,
      [columnNames[1]]: user.email,
      [columnNames[2]]: user.phone,
    };
  });

  const updateUser = (row) => {
    console.log("kullanıcı guncellendi");
    console.log(row);
  };
  const deleteUser = (row) => {
    backendFetchPOST("/deleteUser", { email: row.email }, async (response) => {
      const data = await response.json();
      console.log(data);
    });
    const newAdminUsers = adminUsers.filter((user) => user.email !== row.email);
    setAdminUsers(newAdminUsers);
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [admin, setAdmin] = useState("");

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

  if (pageState === "table") {
    return (
      <div className="table-admin">
        <button
          className="ekle-admin"
          onClick={() => {
            setPageState("addUser");
          }}
        >
          ekle
        </button>
        <TableList
          columnNames={columnNames}
          rowValues={rowValues}
          onUpdate={updateUser}
          onDelete={deleteUser}
        />
      </div>
    );
  } else {
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
            <option value={"1"}>Admin</option>
            <option value={"0"}>Kullanıcı</option>
          </select>
          <button onClick={UserAdd}>Kullanıcı Ekle</button>
        </div>
      </div>
    );
  }
};

export default AdminUsers;
