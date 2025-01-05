import Layout from "@/components/layout/Layout";
import Login from "@/pages/Login/Login";
import Admin from "@/pages/Admin/Admin";
import ServicePage from "@/pages/Admin/Service/Service";
import ServiceTypePage from "@/pages/Admin/ServiceType/ServiceType";
import { routePath } from "@/routes/routePath";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import LocationPage from "@/pages/Admin/Location/Location";

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
        {/* Add more routes for other admin pages */}
      </Route>
    </Routes>
  );
}
