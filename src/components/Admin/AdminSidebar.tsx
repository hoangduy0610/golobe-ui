import React from 'react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/admin/location">Location</Link>
          </li>
          <li>
            <Link to="/admin/accommodation">Accommodation</Link>
          </li>
          <li>
            <Link to="/admin/restaurant">Restaurant</Link>
          </li>
          <li>
            <Link to="/admin/thing-to-do">Thing to Do</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
