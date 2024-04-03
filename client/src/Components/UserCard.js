import React, { useState } from 'react';
import './UserCard.css';
import EditUserModal from './EditUserModal';
import axios from 'axios';

function UserCard({ user, onDelete }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedUserData, setEditedUserData] = useState({ ...user });

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleUserUpdate = (updatedUserData) => {
    setEditedUserData(updatedUserData);
    setShowEditModal(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://heliverse-full-stack-assignment-29sw.onrender.com/api/deleteuser/${editedUserData.id}`);
      onDelete(editedUserData.id);
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="card">
      <div className='firstDiv'>
        <img src={editedUserData.avatar} alt={editedUserData.first_name} />
        <div>
          <button onClick={handleEditClick}>Edit</button>
          <button id='delete' onClick={handleDelete}>Delete</button>
        </div>
      </div>
      <div className="card-body">
        <h3>{editedUserData.first_name} {editedUserData.last_name}</h3>
        <p>ID: {editedUserData.id}</p>
        <p>Email: {editedUserData.email}</p>
        <p>Gender: {editedUserData.gender}</p>
        <p>Domain: {editedUserData.domain}</p>
      </div>
      <EditUserModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        user={editedUserData}
        onUserUpdate={handleUserUpdate}
      />
    </div>
  );
}

export default UserCard;
