import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/User.css';

const CreateUser = () => {
  const [newUser, setNewUser] = useState({
    LOGIN_NAME: '',
    Email: '',
    LOGIN_PASSWORD: '',
    role_id: '',
    Address: '',
    delete: '',
    status: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7099/api/User', newUser);
      navigate('/User');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Create User</h2>
      <form onSubmit={addUser} className="create-user-form">
        <div className="mb-3">
          <input
            type="text"
            name="LOGIN_NAME"
            value={newUser.LOGIN_NAME}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Login Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="Email"
            value={newUser.Email}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="LOGIN_PASSWORD"
            value={newUser.LOGIN_PASSWORD}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="role_id"
            value={newUser.role_id}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Role ID"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="Address"
            value={newUser.Address}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Address"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="delete"
            value={newUser.delete}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Delete"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="status"
            value={newUser.status}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Status"
          />
        </div>
        <button type="submit" className="btn btn-success me-2">Create</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/User')}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateUser;
