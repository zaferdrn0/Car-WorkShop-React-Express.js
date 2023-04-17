import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ListMarka from "./pages/ListMarka";
import ListModel from "./pages/ListModel";
import RepairType from "./pages/RepairType";
import ListWorkshop from "./pages/ListWorkshop";
import MarkaLayout from "./Layout/MarkaLayout";
import IndexLayout from "./Layout/IndexLayout";
import AdminUsers from "./admin/AdminUsers";
import AdminLayout from "./admin/AdminLayout";
import AdminBrands from "./admin/AdminBrands";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<IndexLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element = {<Register/>}/>
          <Route path="/login" element = {<Login/>}/>
        </Route>
        <Route path="/marka" element={<MarkaLayout />}>
          <Route index element={<ListMarka />} />
          <Route path="/marka/:marka" element={<ListModel />} />
          <Route path="/marka/:marka/:model" element={<RepairType/>} />
          <Route path="/marka/:marka/:model/:type" element={<ListWorkshop/>} />
        </Route>
        <Route path="/admin" element ={<AdminLayout/>}>
        
          <Route index element = {<AdminUsers/>}/>
          <Route path="/admin/users" element ={<AdminUsers/>} />
          <Route path="/admin/brands" element ={<AdminBrands/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
