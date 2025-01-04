import '@/components/Layout/Layout.css';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { Link } from 'react-router-dom';


export default function Layout() {
    return (
        // // <div className="container-fluid">
        // //     <div className="row flex-nowrap">
        // //         <div className="sidebar shadow">
        // //             <Sidebar />
        // //         </div>
        // //         <div className="content">         
        // //             <Outlet />
        // //         </div>
        // //     </div>
        // // </div>
        
        <Outlet />
    );
}