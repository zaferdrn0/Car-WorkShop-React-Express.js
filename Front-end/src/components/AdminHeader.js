import React, { useContext } from "react";
import "./css/adminHeader.css";
import { backendFetchGET } from "../utils/backendFetch";
import { Link, useNavigate } from "react-router-dom";
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
        <Link to="/">
          <img alt="" src="/images/logo.png" />
        </Link>
      </div>
      <div className="admin-person">
        <h4>Zafer Duran</h4>
        <h5>Admin</h5>
      </div>

      <div className="panel">
        <ul>
          <li>
            <Link to="/admin/users">
              <h4>Users</h4>
            </Link>
          </li>
          <li>
            <Link to="/admin/brands">
              <h4>Car Brands</h4>{" "}
            </Link>
          </li>
          <li>
            <Link to="/admin/models">
              <h4>Car Models</h4>
            </Link>
          </li>
          <li>
            <Link to="/admin/rtype">
              <h4>Repair Type</h4>
            </Link>
          </li>
          <li>
            <Link to="/admin/workshops">
              <h4>Workshops</h4>
            </Link>
          </li>
          <li>
            <Link to="/admin/gasstation">
              <h4>Gas Station</h4>
            </Link>
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
