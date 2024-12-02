import React from "react";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import { Route, Routes } from "react-router-dom";
import Location from "./Location/Location";
import Accommodation from "./Accommodation/Accommodation";
import Restaurant from "./Restaurant/Restaurant";
import ThingToDo from "./ThingToDo/ThingToDo";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-content">
        <Routes>
          <Route path="location" element={<Location />} />
          <Route path="accommodation" element={<Accommodation />} />
          <Route path="restaurant" element={<Restaurant />} />
          <Route path="thing-to-do" element={<ThingToDo />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
