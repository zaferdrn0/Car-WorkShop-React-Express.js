import React from 'react'
import AdminHeader from '../components/AdminHeader'
import { Outlet } from "react-router-dom";
import "./adminCss/adminLayout.css"
const AdminLayout = () => {
  return (
    <div className='admin-control'>
    
      <AdminHeader/>
      <div className='edit-container'>
        <Outlet />
        </div>
      
   </div>
  )
}

export default AdminLayout