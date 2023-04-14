import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MarkaLayout = () => {
  return (
    <div className="listMarka">
      <Header />
      <div className="listMarka-container">
        <Outlet />
      </div>
    </div>
  );
};

export default MarkaLayout;
