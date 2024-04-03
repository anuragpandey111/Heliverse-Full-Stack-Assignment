import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'

function EditUserModal({ isOpen, onClose, user, onUserUpdate }) {
  const [editedUserData, setEditedUserData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.put(`http://localhost:5000/api/updateuser/${editedUserData.id}`, editedUserData);
      if (response.status === 200) {
        onUserUpdate(editedUserData);
        onClose();
        toast.success('Updated successfully')
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update')
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <input name="first_name" placeholder="First Name" value={editedUserData.first_name} onChange={handleChange} />
          <input name="last_name" placeholder="Last Name" value={editedUserData.last_name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={editedUserData.email} onChange={handleChange} />
          <input name="domain" placeholder="Domain" value={editedUserData.domain} onChange={handleChange} />
          <input name="gender" placeholder="Gender" value={editedUserData.gender} onChange={handleChange} />
          <input name="avatar" placeholder="Avatar" value={editedUserData.avatar} onChange={handleChange} />
          <select name="available" value={editedUserData.available} onChange={handleChange}>
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
          <button type="submit">Save Changes</button>
          <button className="close" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
