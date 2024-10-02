// src/components/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el estado de autenticación
    localStorage.removeItem('isAuthenticated');
    // Redirigir al usuario a la página de login
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2>Bienvenido al Dashboard</h2>
      <button onClick={handleLogout} style={styles.button}>Cerrar Sesión</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '5rem'
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Dashboard;
