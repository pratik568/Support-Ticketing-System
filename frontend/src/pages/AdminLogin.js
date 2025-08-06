import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email === 'admin@123.com' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin-dashboard');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <input
            name="email"
            type="email"
            placeholder="Admin Email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <button type="submit">Login</button>
          <p><b>Admin Email:</b> admin@123.com</p>
          <p><b>Password:</b> admin123</p>
        </form>

        <div className="admin-login-links">
          <p>Not an admin?</p>
          <Link to="/login">
            <button className="link-button">User Login</button>
          </Link>
          <br />
          <Link to="/register">
            <button className="link-button">User Registration</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
