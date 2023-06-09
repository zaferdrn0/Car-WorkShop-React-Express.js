import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ListWorkshop from "./pages/ListWorkshop";
import IndexLayout from "./Layout/IndexLayout";
import AdminUsers from "./admin/AdminUsers";
import AdminLayout from "./Layout/AdminLayout";
import AdminBrands from "./admin/AdminBrands";
import AdminModels from "./admin/AdminModels";
import AdminRepairType from "./admin/AdminRepairType";
import AdminWorkshops from "./admin/AdminWorkshops";
import WorkshopAdminLayout from "./Layout/WorkshopAdminLayout"
import WorkshopUsers from "./workshopAdmin/WorkshopUsers";
import { LoginProvider } from "./context/UserControl";
import Workshop from "./pages/Workshop";
import WorkshopEdit from "./workshopAdmin/WorkshopEdit";
import React from 'react';
import FuelAccount from "./pages/FuelAccount";
import AdminGasStation from "./admin/AdminGasStation";
import FuelAdd from "./pages/FuelAdd";
import FuelDetail from "./pages/FuelDetail";

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Routes>
          <Route path="/" element={<IndexLayout />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/workshops" element={<ListWorkshop />} />
            <Route path="/workshop" element = {<Workshop/>}/>
            <Route path="/fuelaccount" element = {<FuelAccount/>}/>
            <Route path="/fueladd" element = {<FuelAdd/>}/>
            <Route path="/fueldetails" element ={<FuelDetail/>}/>
          </Route>

          <Route path="/admin/" element={<AdminLayout />}>
            <Route index element={<AdminUsers />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="brands" element={<AdminBrands />} />
            <Route path="models" element={<AdminModels />} />
            <Route path="rtype" element={<AdminRepairType />} />
            <Route path="workshops" element={<AdminWorkshops />} />
            <Route path="gasstation" element={<AdminGasStation/>}/>
          </Route>
          <Route path="/workshopadmin" element = {<WorkshopAdminLayout/>}>
            <Route index element = {<WorkshopEdit/>}/>
            <Route path="users" element = {<WorkshopUsers/>}/>
            <Route path="workshopcontrol" element = {<WorkshopEdit/>}/>
            
          </Route>
        </Routes>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
