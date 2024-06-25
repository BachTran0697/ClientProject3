import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/authService'; // Import the authentication hook

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Access user and logout from the auth context

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        {user && user.roleId === '1' && (
          <li><NavLink to="/user">User</NavLink></li>
        )}
        {user && (
          <li><button onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
