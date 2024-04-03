import React, { useState } from 'react';
import './NewUserModal.css';

function NewUserModal({ isOpen, onClose, onNewUserSubmit }) {
  const [newUserData, setNewUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    domain: '',
    gender: '',
    available: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNewUserSubmit(newUserData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <input name="id" placeholder="ID" value={newUserData.id} onChange={handleChange} />
          <input name="first_name" placeholder="First Name" value={newUserData.first_name} onChange={handleChange} />
          <input name="last_name" placeholder="Last Name" value={newUserData.last_name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={newUserData.email} onChange={handleChange} />
          <input name="domain" placeholder="Domain" value={newUserData.domain} onChange={handleChange} />
          <input name="gender" placeholder="Gender" value={newUserData.gender} onChange={handleChange} />
          <input name="avatar" placeholder="Avatar" value={newUserData.avatar} onChange={handleChange} />
          <select name="available" value={newUserData.available} onChange={handleChange}>
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
          <button type="submit">Submit</button>
          <button className="close" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default NewUserModal;
