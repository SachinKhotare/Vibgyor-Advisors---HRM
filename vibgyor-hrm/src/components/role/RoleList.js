import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RoleList() {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const res = await axios.get('http://localhost:5000/roles');
    setRoles(res.data);
  };

  const deleteRole = async (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      await axios.delete(`http://localhost:5000/roles/${id}`);
      fetchRoles();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Role Management</h2>

      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate('/roles/add')}
      >
        Add Role
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.role_id}>
              <td>{role.role_name}</td>
              <td>{role.description}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/roles/edit/${role.role_id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteRole(role.role_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoleList;
