import { Outlet } from "react-router-dom";
import Navbar from "../molecules/Navbar";
const Layouts = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layouts;
