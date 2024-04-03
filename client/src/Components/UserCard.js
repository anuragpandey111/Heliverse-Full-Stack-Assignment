import React from 'react';

function UserCard({ user }) {
  return (
    <div className="card">
      <img src={user.avatar} alt={user.first_name} />
      <div className="card-body">
        <h3>{user.first_name} {user.last_name}</h3>
        <p>Email: {user.email}</p>
        <p>Gender: {user.gender}</p>
        <p>Domain: {user.domain}</p>
      </div>
    </div>
  );
}

export default UserCard;
