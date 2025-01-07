import { Home } from "@/pages/home/Home";
import { Link } from "react-router-dom";
import { Blog } from "@/pages/blog/Blog";
import TripDetail from "@/pages/TripDetail/TripDetail";
import Admin from "@/pages/Admin/Admin";
import Trips from "@/pages/Trips/Trips";
import LocationPage from "@/pages/Admin/Location/Location";
import Forum from "@/pages/Forum/Forum";
import Services from "@/pages/Services/Services";

export const routePath = [
    {
        index: true,
        path: '',
        icon: 'fas fa-home',
        title: 'Trang chủ',
        component: <Home />
    },
    {
        index: false,
        path: 'about',
        icon: 'fas fa-info-circle',
        title: 'Thông tin',
        component: <About />
    },
    // {
    //     index: false,
    //     path: 'dashboard',
    //     icon: 'fas fa-tachometer-alt',
    //     title: 'Quản lí danh mục',
    //     component: <Dashboard />
    // },
    {
        index: false,
        path: 'blog',
        icon: 'fas fa-blog',
        title: 'Blog',
        component: <Blog />
    },
    {
        index: false,
        path: 'forum',
        icon: 'fas fa-blog',
        title: 'forum',
        component: <Forum />
    },
    {
        index: false,
        path: 'services',
        icon: 'fas fa-blog',
        title: 'services',
        component: <Services />
    },
    {
        index: false,
        path: 'trip-detail/:id', 
        icon: 'fas fa-plane',
        title: 'Trips',
        component: <TripDetail />
    },
    {
        index: false,
        path: 'trips', 
        icon: 'fas fa-plane',
        title: 'Trips',
        component: <Trips />
    },
    {
        index: false,
        path: 'admin', 
        icon: 'fas fa-user-shield',
        title: 'Admin',
        component: <Admin />
    },
    // {
    //     index: false,
    //     path: 'location', 
    //     icon: 'fas fa-map-marker-alt',
    //     title: 'Location',
    //     component: <LocationPage />
    // },
    
    {
        index: false,
        path: '*',
        component: <NoMatch />
    }
];

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    );
}

function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}
