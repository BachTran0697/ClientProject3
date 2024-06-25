import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../css/User.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://localhost:7099/api/User');
      console.log('Fetched users:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://localhost:7099/api/User/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const startEditing = (user) => {
    setEditingUser(user);
  };

  const cancelEditing = () => {
    setEditingUser(null);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7099/api/User/update', editingUser);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Users</h1>
      <div className="mb-3">
        <NavLink to="/User/createUser" className="btn btn-primary">Create User</NavLink>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Login Name</th>
            <th>Email</th>
            <th>Role ID</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.logiN_ID}>
              <td>{user.logiN_NAME}</td>
              <td>{user.email}</td>
              <td>{user.role_id}</td>
              <td>{user.address}</td>
              <td>{user.status}</td>
              <td>
                <button className="btn btn-secondary btn-sm me-2" onClick={() => startEditing(user)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.logiN_ID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        <form onSubmit={saveUser} className="mt-4">
          <h2>Edit User</h2>
          <div className="mb-3">
            <input
              type="text"
              name="logiN_NAME"
              value={editingUser.logiN_NAME}
              onChange={handleEditChange}
              className="form-control"
              placeholder="Login Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={editingUser.email}
              onChange={handleEditChange}
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="role_id"
              value={editingUser.role_id}
              onChange={handleEditChange}
              className="form-control"
              placeholder="Role ID"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="address"
              value={editingUser.address}
              onChange={handleEditChange}
              className="form-control"
              placeholder="Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="status"
              value={editingUser.status}
              onChange={handleEditChange}
              className="form-control"
              placeholder="Status"
            />
          </div>
          <button type="submit" className="btn btn-success me-2">Save</button>
          <button type="button" className="btn btn-secondary" onClick={cancelEditing}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default User;
