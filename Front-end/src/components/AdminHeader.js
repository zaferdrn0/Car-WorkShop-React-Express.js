import React from "react";
import "./css/adminHeader.css";

const AdminHeader = () => {
  return (
    <div className="admin-left-header">
      <a href="/">
        <img alt="" src="./images/logo.png" />
      </a>
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
    </div>
  );
};

export default AdminHeader;
