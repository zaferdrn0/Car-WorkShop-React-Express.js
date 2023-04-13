import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ListMarka from "./pages/ListMarka";
import MarkaLayout from "./pages/MarkaLayout";
import ListModel from "./pages/ListModel";
import RepairType from "./pages/RepairType";
import ListWorkshop from "./pages/ListWorkshop";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/marka" element={<MarkaLayout />}>
          <Route index element={<ListMarka />} />
          <Route path="/marka/:marka" element={<ListModel />} />
          <Route path="/marka/:marka/:model" element={<RepairType/>} />
          <Route path="/marka/:marka/:model/:type" element={<ListWorkshop/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
