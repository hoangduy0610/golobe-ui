import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import Login from "@/pages/Login/Login";
import Admin from "@/pages/Admin/Admin";
import AdminLogin from "@/pages/Admin/Login/Login";
import BlogDetail from "@/pages/BlogDetail/BlogDetail";
import { routePath } from "@/routes/routePath";

// Admin Pages
import LocationPage from "@/pages/Admin/Location/Location";
import ServicePage from "@/pages/Admin/Service/Service";
import ServiceTypePage from "@/pages/Admin/ServiceType/ServiceType";
import PlanPage from "@/pages/Admin/Plan/Plan";
import AdminBlog from "@/pages/Admin/AdminBlog/AdminBlog";
import AdminForum from "@/pages/Admin/AdminForum/AdminForum";
import User from "@/pages/Admin/User/User";
import Review from "@/pages/Admin/Review/Review";
import PostDetail from "@/pages/PostDetail/PostDetail";
import ServiceDetails from "@/pages/ServiceDetail.tsx/ServiceDetail";
import Chat from "@/pages/Chat/Chat";


export default function AppRoute() {
  const navigate = useNavigate();
  const isAdminRoute = window.location.pathname.includes("/admin");
  const adminToken = localStorage.getItem("adminToken");
  const token = localStorage.getItem("token");

  // Danh sách route cho phép không cần xác thực
  const whitelistRoutes = new Set([
    "/login",
    "/register",
    "/",
    "/about",
    "/blog",
    "/trip-detail",
  ]);

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (whitelistRoutes.has(currentPath)) return;

    if (isAdminRoute && !adminToken) {
      navigate("/admin/login");
    }
    // else if (!isAdminRoute && !token) {
    //   navigate("/login");
    // }
  }, []);

  // Định nghĩa các route cho admin
  const adminRoutes = [
    { path: "location", component: <LocationPage /> },
    { path: "service", component: <ServicePage /> },
    { path: "service-type", component: <ServiceTypePage /> },
    { path: "plan", component: <PlanPage /> },
    { path: "blog", component: <AdminBlog /> },
    { path: "forum", component: <AdminForum /> },
    { path: "user", component: <User /> },
    { path: "review", component: <Review /> },
  ];

  return (
    <Routes>
      {/* Routes cho người dùng */}
      <Route path="/" element={<Layout />}>
        {routePath.map((route, index) => (
          <Route key={index} index={route.index} path={route.path} element={route.component} />
        ))}
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/blog-detail/:id" element={<BlogDetail />} />
      <Route path="/forum/:id" Component={PostDetail} />
      <Route path="/services/:id" element={<ServiceDetails />} />
      <Route path='/chat' element={<Chat />} />

      {/* Routes cho admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<Admin />}>
        {adminRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Route>
    </Routes>
  );
}
