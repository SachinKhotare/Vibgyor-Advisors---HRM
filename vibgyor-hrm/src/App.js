import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Department from './components/Department';
import RoleList from './components/role/RoleList';
import AddRole from './components/role/AddRole';
import EditRole from './components/role/EditRole';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Department />} />
        <Route path="/roles" element={<RoleList />} />
        <Route path="/roles/add" element={<AddRole />} />
        <Route path="/roles/edit/:id" element={<EditRole />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
