import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import ListWorkshop from "./pages/ListWorkshop";

import IndexLayout from "./Layout/IndexLayout";
import AdminUsers from "./admin/AdminUsers";
import AdminLayout from "./admin/AdminLayout";
import AdminBrands from "./admin/AdminBrands";
import AdminModels from "./admin/AdminModels";
import AdminRepairType from "./admin/AdminRepairType";
import AdminWorkshops from "./admin/AdminWorkshops";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<IndexLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element = {<Register/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/workshops" element ={<ListWorkshop/>}/>
        </Route>
      {/*   <Route path="/marka" element={<MarkaLayout />}>
          <Route index element={<ListMarka />} />
          <Route path="/marka/:marka" element={<ListModel />} />
          <Route path="/marka/:marka/:model" element={<RepairType/>} />
          <Route path="/marka/:marka/:model/:type" element={<ListWorkshop/>} />
        </Route> */}
        <Route path="/admin" element ={<AdminLayout/>}>
          <Route index element = {<AdminUsers/>}/>
          <Route path="/admin/users" element ={<AdminUsers/>} />
          <Route path="/admin/brands" element ={<AdminBrands/>}/>
          <Route path="/admin/models" element = {<AdminModels/>}/>
          <Route path ="/admin/rtype" element ={<AdminRepairType/>}/>
          <Route path="/admin/workshops" element = {<AdminWorkshops/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
