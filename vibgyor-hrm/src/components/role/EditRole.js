import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditRole() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roleName, setRoleName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadRole();
  }, []);

  const loadRole = async () => {
    const res = await axios.get('http://localhost:5000/roles');
    const role = res.data.find((r) => r.role_id === parseInt(id));
    setRoleName(role.role_name);
    setDescription(role.description);
  };

  const updateRole = async () => {
    await axios.put(`http://localhost:5000/roles/${id}`, {
      role_name: roleName,
      description: description,
    });

    navigate('/roles');
  };

  return (
    <div className="container mt-4">
      <h2>Edit Role</h2>

      <input
        className="form-control mb-2"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="btn btn-primary" onClick={updateRole}>
        Update Role
      </button>
    </div>
  );
}

export default EditRole;
