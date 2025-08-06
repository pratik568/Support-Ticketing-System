import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // ✅ Import the CSS

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch open / need-to-call tickets
  const fetchTickets = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/tickets');
      const openTickets = res.data.filter(ticket => {
        const status = ticket.status?.toLowerCase();
        return status === 'open' || status === 'need to call';
      });
      setTickets(openTickets);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    }
  }, []);

  // ✅ Update ticket status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/tickets/${id}`, { status: newStatus });

      // Remove from UI if closed
      if (newStatus.toLowerCase() === 'closed') {
        setTickets(prev => prev.filter(ticket => ticket._id !== id));
      } else {
        setTickets(prev =>
          prev.map(ticket =>
            ticket._id === id ? { ...ticket, status: newStatus } : ticket
          )
        );
      }
    } catch (err) {
      alert('Failed to update ticket');
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
    } else {
      fetchTickets();
    }
  }, [navigate, fetchTickets]);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      {tickets.length === 0 ? (
        <p>No open tickets.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Contact Number</th>
              <th>Concern</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket._id}>
                <td>{ticket.name}</td>
                <td>{ticket.email}</td>
                <td>{ticket.course}</td>
                <td>{ticket.contactNumber}</td>
                <td>{ticket.concern}</td>
                <td>
                  <select
                    value={ticket.status}
                    onChange={(e) => updateStatus(ticket._id, e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="Need to Call">Need to Call</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
