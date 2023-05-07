import React, { useContext } from "react";
import "./css/adminHeader.css";
import { backendFetchGET } from "../utils/backendFetch";
import { useNavigate } from "react-router-dom";
import { context } from "../context/UserControl";

const AdminHeader = () => {
  const { setLoggedIn } = useContext(context);
  const navigate = useNavigate();
  const LogOut = () =>{
    backendFetchGET("/logout", async (response) =>{
      const data = await response.json();
      if(response.status === 202){
        navigate("/");
        setLoggedIn(false)
      }
    })

}
  return (
    <div className="admin-left-header">
      <div className="admin-logo">
        <a href="/">
          <img alt="" src="/images/logo.png" />
        </a>
      </div>
      <div className="admin-person">
        <h4>Zafer Duran</h4>
        <h5>Admin</h5>
      </div>

      <div className="panel">
        <ul>
          <li>
            <a href="/admin/users">
              <h4>Users</h4>
            </a>
          </li>
          <li>
            <a href="/admin/brands">
              <h4>Car Brands</h4>{" "}
            </a>
          </li>
          <li>
            <a href="/admin/models">
              <h4>Car Models</h4>
            </a>
          </li>
          <li>
            <a href="/admin/rtype">
              <h4>Repair Type</h4>
            </a>
          </li>
          <li>
            <a href="/admin/workshops">
              <h4>Workshops</h4>
            </a>
          </li>
          <li>
            <a href="/admin/message">
              <h4>Message</h4>
            </a>
          </li>
        </ul>
      </div>
      <div className="admin-exit">
        <button onClick={LogOut}>Exit</button>
      </div>
    </div>
  );
};

export default AdminHeader;
