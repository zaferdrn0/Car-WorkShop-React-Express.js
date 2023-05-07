import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { Outlet } from "react-router-dom";
import "../admin/adminCss/adminLayout.css";
import { backendFetchGET } from "../utils/backendFetch";
import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const containerStyle = {
    position: "relative",
  };

  useEffect(() => {
    const adminCheck = () => {
      backendFetchGET("/adminCheck", async (response) => {
        const status = await response.status;
        if (status === 401) {
          navigate("/");
        } else if (status === 404) {
          navigate("/login");
        } else {
          setLoading(true);
        }
      });
    };
    adminCheck();
  }, []);
  if (loading === true) {
    return (
      <div className="admin-control">
        <AdminHeader />
        <div style={containerStyle} className="edit-container">
          <Outlet />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default AdminLayout;
