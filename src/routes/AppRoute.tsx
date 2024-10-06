import Layout from "@/components/layout/Layout";
import Login from "@/pages/Login/Login";
import { RootState } from "@/redux/store";
import { routePath } from "@/routes/routePath";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

export default function AppRoute() {
  const navigate = useNavigate();
  // const token = useSelector((state: RootState) => state.user.token);
  // useEffect(() => {
  //   if (!token) {
  //     navigate('/login');
  //   }
  // }, [token]);

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
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routePathRender()}
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}