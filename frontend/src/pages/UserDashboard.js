import React from 'react';
import { useNavigate } from 'react-router-dom';
import TicketForm from '../components/TicketForm';

const UserDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  // Block access if not logged in or if user is admin
  if (!token || !user || isAdmin) {
    return <p>Access denied. Please log in as a user.</p>;
  }

  return (
    <div>
      <TicketForm token={token} user={user} onLogout={handleLogout} />
    </div>
  );
};

export default UserDashboard;
