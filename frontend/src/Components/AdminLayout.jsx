import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

import React from "react";
import Sidebar from "../Components/SideBar";

function AdminLayout() {
  return (
    <div className="main-wrapper" id="ontop">
      <Navbar />
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AdminLayout;
