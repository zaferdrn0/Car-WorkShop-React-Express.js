import React from 'react'
import WorkshopAdminHeader from '../components/WorkshopAdminHeader'
import { Outlet } from 'react-router-dom'

const WorkshopAdminLayout = () => {
    const containerStyle = {
        position: "relative",
      };
  return ( 
  <div className="admin-control">
      <WorkshopAdminHeader/>
    <div style={containerStyle} className="edit-container">
      <Outlet />
    </div>
  </div>
  )
}

export default WorkshopAdminLayout