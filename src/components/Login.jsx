import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/musho.jpg'; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = data => {
    // Simular una llamada a una API de autenticación
    console.log(data);
    const { email, password } = data;

    // Simulación de autenticación
    if (email === 'usuario@ejemplo.com' && password === 'contraseña') {
      // Guardar el estado de autenticación en el localStorage o en el contexto
      localStorage.setItem('isAuthenticated', 'true');
      // Redirigir al usuario a la página protegida
      navigate('/dashboard');
    } else {
      alert('Credenciales inválidas. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div style={styles.container}>
      {/* Agregar la imagen */}
      <img src={logo} alt="Logo" style={styles.logo} />

      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            {...register('email', { 
              required: 'El correo electrónico es obligatorio',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Correo electrónico inválido'
              }
            })}
          />
          {errors.email && <span style={styles.error}>{errors.email.message}</span>}
        </div>

        <div style={styles.inputGroup}>
          <label>Contraseña:</label>
          <input
            type="password"
            {...register('password', { 
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres'
              }
            })}
          />
          {errors.password && <span style={styles.error}>{errors.password.message}</span>}
        </div>

        <button type="submit" style={styles.button}>Entrar</button>
      </form>
    </div>
  );
};

// Estilos básicos en línea
const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginTop: '5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
    backgroundColor: '#f9f9f9'
  },
  logo: {
    width: '100px',
    marginBottom: '1.5rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  inputGroup: {
    marginBottom: '1rem',
    textAlign: 'left'
  },
  error: {
    color: 'red',
    fontSize: '0.8rem'
  },
  button: {
    padding: '0.5rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  }
};

export default Login;
