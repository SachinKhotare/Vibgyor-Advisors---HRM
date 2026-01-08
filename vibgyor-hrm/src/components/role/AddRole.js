import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRole() {
  const [roleName, setRoleName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const saveRole = async () => {
    if (!roleName) {
      alert('Role name is required');
      return;
    }

    await axios.post('http://localhost:5000/roles', {
      role_name: roleName,
      description: description,
    });

    navigate('/roles');
  };

  return (
    <div className="container mt-4">
      <h2>Add Role</h2>

      <input
        className="form-control mb-2"
        placeholder="Role Name"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="btn btn-success" onClick={saveRole}>
        Save Role
      </button>
    </div>
  );
}

export default AddRole;
