import React, { useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import { Outlet } from "react-router-dom";
import "./adminCss/adminLayout.css";
import { backendFetchGET } from "../utils/backendFetch"
import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const containerStyle = {
    position: "relative",
  };

  useEffect(() =>{
    const adminCheck = () => {backendFetchGET("/adminCheck", async (response) =>{
      const status = await response.status;
      if(status === 401){
        navigate("/");
      }
      else if(status === 404) {
        navigate("/login")
      }
      
    })} 
    adminCheck();
  },[])

  return (
    <div className="admin-control">
      <AdminHeader />
      <div style={containerStyle} className="edit-container">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
