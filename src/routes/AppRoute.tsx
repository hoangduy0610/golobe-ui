import Layout from "@/components/layout/Layout";
import Login from "@/pages/Login/Login";
import Admin from "@/pages/Admin/Admin";
import ServicePage from "@/pages/Admin/Service/Service";
import ServiceTypePage from "@/pages/Admin/ServiceType/ServiceType";
import PlanPage from "@/pages/Admin/Plan/Plan";
import { routePath } from "@/routes/routePath";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import LocationPage from "@/pages/Admin/Location/Location";
import AdminBlog from "@/pages/Admin/AdminBlog/AdminBlog";
import AdminForum from "@/pages/Admin/AdminForum/AdminForum";
import User from "@/pages/Admin/User/User";
import Review from "@/pages/Admin/Review/Review";

export default function AppRoute() {
  const navigate = useNavigate();

  const routePathRender = () => {
    return routePath.map((route, index) => {
      return (
        <Route
          key={index}
          index={route.index}
          path={route.path}
          element={route.component}
        />
      );
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routePath.map((route, index) => (
          <Route key={index} index={route.index} path={route.path} element={route.component} />
        ))}
      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="/admin/*" element={<Admin />}>
        {/* Admin panel routes */}
        <Route path="location" element={<LocationPage />} />
        <Route path="service" element={<ServicePage />} />
        <Route path="service-type" element={<ServiceTypePage />} />
        <Route path="plan" element={<PlanPage />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="forum" element={<AdminForum />} />
        <Route path="user" element={<User />} />
        <Route path="review" element={<Review />} />
        {/* Add more routes for other admin pages */}
      </Route>
    </Routes>
  );
}
