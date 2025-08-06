import React, { useState } from 'react';
import axios from 'axios';
import './TicketForm.css';

const TicketForm = ({ user, token, onLogout }) => {
  const [formData, setFormData] = useState({
    course: '',
    contactNumber: '',
    concern: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/tickets/submit',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSuccessMessage('Ticket submitted successfully!');
      setFormData({ course: '', contactNumber: '', concern: '' });
    } catch (error) {
      console.error('Ticket submission failed:', error);
      alert('Failed to submit ticket');
    }
  };

  return (
    <div className="ticket-form-container">
      {/* Top Navbar */}
      <div className="user-navbar">
        <div className="navbar-title">User Dashboard</div>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>

      {/* Ticket Form */}
      <form className="ticket-form" onSubmit={handleSubmit}>
        <h3>Raise a Support Ticket</h3>

        <label>Course:</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        >
          <option value="">--Select Course--</option>
          <option value="Full Stack">Full Stack</option>
          <option value="AWS">AWS</option>
          <option value="Python">Python</option>
        </select>

        <label>Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />

        <label>Concern:</label>
        <textarea
          name="concern"
          value={formData.concern}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Ticket</button>

        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default TicketForm;
