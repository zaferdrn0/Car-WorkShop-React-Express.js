import React from 'react'
import AdminHeader from '../components/AdminHeader'
import { Outlet } from "react-router-dom";
import "./adminCss/adminLayout.css"
const AdminLayout = () => {
  const containerStyle = {
    position: "relative",
    
  }
  return (
    <div className='admin-control'>
    
      <AdminHeader/>
      <div style={containerStyle} className='edit-container'>
        <Outlet />
        </div>
      
   </div>
  )
}

export default AdminLayout