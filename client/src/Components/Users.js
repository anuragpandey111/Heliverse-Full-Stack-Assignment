import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import UserCard from './UserCard';
import TeamCreator from './TeamCreator';
import './Users.css'

function Users() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    domain: [],
    gender: [],
    available: []
  });
  const [showTeamCreator, setShowTeamCreator] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.filter(user => {
    const matchesSearchTerm = user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              user.last_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDomain = filters.domain.length === 0 || filters.domain.includes(user.domain);

    const matchesGender = filters.gender.length === 0 || filters.gender.includes(user.gender);

    const matchesAvailability = filters.available.length === 0 || filters.available.includes(user.available.toString());

    return matchesSearchTerm && matchesDomain && matchesGender && matchesAvailability;
  }).slice(indexOfFirstUser, indexOfLastUser);


  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };


  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
    setCurrentPage(1);
  };

  const showTeamCreatorModal = () => {
    setShowTeamCreator(true);
  };

  const hideTeamCreatorModal = () => {
    setShowTeamCreator(false);
  };

  return (
    !showTeamCreator ? (
      <div className="container">
        <h1>Users</h1>
        <button onClick={showTeamCreatorModal}>Create Team</button>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="filters">
          <div className='filtersChild'>
            <label>Domain:</label>
            <select onChange={e => handleFilterChange('domain', e.target.value)} >
              <option value="">Select</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="IT">IT</option>
              <option value="Business Development">Business Development</option>
              <option value="Management">Management</option>
              <option value="UI Designing">UI Designing</option>
            </select>
          </div>
          <div>
            <label>Gender:</label>
            <select onChange={e => handleFilterChange('gender', e.target.value)} >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Polygender">Polygender</option>
              <option value="Genderfluid">Genderfluid</option>
              <option value="Agender">Agender</option>
              <option value="Bigender">Bigender</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Genderqueer">Genderqueer</option>
            </select>
          </div>
          <div>
            <label>Availability:</label>
            <select onChange={e => handleFilterChange('available', e.target.value)} >
              <option value="">Select</option>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
        </div>
        <div className="card-container">
          {currentUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
        <Pagination
          usersPerPage={usersPerPage}
          totalUsers={users.length}
          paginate={paginate}
        />
      </div>
    ) : (<TeamCreator onClose={hideTeamCreatorModal} />)
  );
  
}

export default Users;
