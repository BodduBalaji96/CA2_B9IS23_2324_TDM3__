import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageReservations.css'; // Add your custom styling
import AdminDashboard from './AdminDashboard';

const ManageReservations = ({ onLogout }) => {
    const [reservations, setReservations] = useState([]);
    const [sortType, setSortType] = useState('latestReserved'); // Default sort by latest reserved date

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/reservations'); // Updated API endpoint
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const handleSort = (type) => {
        setSortType(type);
    };

    const sortedReservations = [...reservations].sort((a, b) => {
        if (sortType === 'latestReserved') {
            return new Date(b.date) - new Date(a.date); // Sort by latest reserved date
        } else if (sortType === 'time') {
            return new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`); // Sort by time
        } else {
            return 0;
        }
    });

    const handleLogout = () => {
        if (typeof onLogout === 'function') {
            onLogout(); // Call onLogout function passed from props
        }
    };

    return (
        <div className="manage-reservations">
            <AdminDashboard username="Admin" onLogout={handleLogout} />
            <h1>Manage Reservations</h1>
            <div className="sorting-buttons">
                <button
                    className={sortType === 'latestReserved' ? 'active' : ''}
                    onClick={() => handleSort('latestReserved')}
                >
                    Sort by Latest Reserved Date
                </button>
                <button
                    className={sortType === 'time' ? 'active' : ''}
                    onClick={() => handleSort('time')}
                >
                    Sort by Time
                </button>
            </div>

            <div className="reservation-list">
                {sortedReservations.length > 0 ? (
                    sortedReservations.map((reservation) => (
                        <div key={reservation.id} className="reservation-item">
                            <h3>{reservation.name}</h3>
                            <p>Reservation Date: {reservation.date}</p>
                            <p>Time: {reservation.time}</p>
                            <p>Number of People: {reservation.people}</p>
                        </div>
                    ))
                ) : (
                    <p>No reservations found.</p>
                )}
            </div>
        </div>
    );
};

export default ManageReservations;
