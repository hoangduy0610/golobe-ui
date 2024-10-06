import '@/components/layout/Layout.css';
import Sidebar from "@/components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        // <div className="container-fluid">
        //     <div className="row flex-nowrap">
        //         <div className="sidebar shadow">
        //             <Sidebar />
        //         </div>
        //         <div className="content">         
        //             <Outlet />
        //         </div>
        //     </div>
        // </div>
        <Outlet />
    );
}