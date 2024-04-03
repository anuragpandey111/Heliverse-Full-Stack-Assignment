import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeamCreator.css'

function TeamCreator({ onClose }) {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamCreated, setTeamCreated] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://heliverse-full-stack-assignment-29sw.onrender.com/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserSelect = (user) => {
    const userIndex = selectedUsers.findIndex(u => u.id === user.id);
    if (userIndex === -1) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      const updatedUsers = [...selectedUsers];
      updatedUsers.splice(userIndex, 1);
      setSelectedUsers(updatedUsers);
    }
  };

  const isUserSelectable = (user) => {
    return (
      !selectedUsers.some(u => u.domain === user.domain) &&
      !selectedUsers.some(u => u.available === user.available)
    );
  };

  const createUserTeam = () => {
    console.log('Team created with users:', selectedUsers);
    setTeamCreated(true);
  };

  return (
    <div className='team-creator'>
      <h2>Create Team</h2>
      {teamCreated ? (
        <div >
          <h3>Selected Users:</h3>
          <ul>
            {selectedUsers.map((user) => (
              <li key={user.id}>
                {user.first_name} {user.last_name} - {user.domain} ({user.available ? 'Available' : 'Not Available'})
              </li>
            ))}
          </ul>
          <button onClick={onClose}>Close</button>
        </div>
      ) : (
        <div>
          <div>
            <h3>Select Users:</h3>
            <div className='btns'>
            <button onClick={createUserTeam}>Create Team</button>
            <button onClick={onClose}>Cancel</button>
            </div>
            <ul className='select-user'>
              {users.map((user) => (
                <li key={user.id} >
                  <div >

                    <label>
                      <input
                        type="checkbox"
                        checked={selectedUsers.some(u => u.id === user.id)}
                        onChange={() => handleUserSelect(user)}
                        disabled={!isUserSelectable(user)}
                      />
                      {user.first_name} {user.last_name} - {user.domain} ({user.available ? 'Available' : 'Not Available'})
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='btns'>
            <button onClick={createUserTeam}>Create Team</button>
            <button onClick={onClose}>Cancel</button>
            </div>
        </div>
      )}
    </div>
  );
}

export default TeamCreator;
