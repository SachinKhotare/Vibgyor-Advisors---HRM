const API_URL = 'http://localhost:5000/departments';

export const getDepartments = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

export const addDepartment = async (name) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    return res.json();
};

export const updateDepartment = async (id, name) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    return res.json();
};

export const deleteDepartment = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    return res.json();
};
