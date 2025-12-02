import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = ({ username, onLogout }) => {
    return (
        <div className="admin-dashboard">
            <h1>Welcome to Your Dashboard, {username}!</h1>
            <nav>
                <ul>
                    <li><Link to="/api/admin/menu">Manage Menu</Link></li>
                    <li><Link to="/api/admin/reservations">Manage Reservations</Link></li>
                    <li><Link to="/api/admin/orders">Manage Orders</Link></li>
                    <li><button onClick={onLogout}>Logout</button></li>

                </ul>
            </nav>
        </div>
    );
};

export default AdminDashboard;
