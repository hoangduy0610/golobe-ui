// import huyHieuCA from "@/assets/HuyHieuCA.png";
import sidebarStyles from "@/components/sidebar/Sidebar.module.css";
import { routePath } from "@/routes/routePath";
import { comparePathname } from "@/utils/uri";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const [currentPath, setCurrentPath] = useState('');

    const location = useLocation();

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    const renderNavigationList = () => {
        return routePath.map((route, index) => {
            if (route.path === '*') {
                return null;
            }
            return (
                <li key={index} className="nav-item">
                    <Link to={route.path} className={`nav-link ${comparePathname(route.path, currentPath) ? 'active' : 'text-dark'}`}>
                        <i className={route.icon}></i>
                        <span className="ms-2">{route.title}</span>
                    </Link>
                </li>
            );
        });
    }

    return (
        <div className="d-flex flex-column align-items-center align-items-sm-start pt-2 min-vh-100">
            {/* <img className={sidebarStyles.huyHieu} src={huyHieuCA} alt="Công an hiệu" /> */}
            <h3 className="mt-2 align-self-center fw-bold">Giám sát</h3>
            <ul className="nav nav-pills flex-column mb-auto w-100">
                {renderNavigationList()}
            </ul>
        </div>
    );
}