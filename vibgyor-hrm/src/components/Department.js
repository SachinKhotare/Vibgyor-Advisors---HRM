import React, { useEffect, useState } from 'react';
import { getDepartments, addDepartment, updateDepartment, deleteDepartment } from '../services/departmentService';

function Department() {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => { loadDepartments(); }, []);

    const loadDepartments = async () => {
        const data = await getDepartments();
        setDepartments(data);
    };

    const handleAdd = async () => {
        if (!name) return alert('Enter department name');
        if (editId) await updateDepartment(editId, name);
        else await addDepartment(name);
        setName(''); setEditId(null); loadDepartments();
    };

    const handleEdit = (dept) => { setName(dept.name); setEditId(dept.id); };
    const handleDelete = async (id) => { await deleteDepartment(id); loadDepartments(); };

    return (
        <div className="container mt-4">
            <h2>Departments</h2>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Department Name" className="form-control mb-2"/>
            <button className="btn btn-primary mb-3" onClick={handleAdd}>{editId ? 'Update' : 'Add'}</button>
            <table className="table table-bordered">
                <thead>
                    <tr><th>ID</th><th>Name</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {departments.map(dept => (
                        <tr key={dept.id}>
                            <td>{dept.id}</td>
                            <td>{dept.name}</td>
                            <td>
                                <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(dept)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(dept.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Department;
