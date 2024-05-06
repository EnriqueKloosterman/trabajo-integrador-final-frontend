import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Enviar datos de inicio de sesión a la API
    try {
      const response = await fetch('https://6627d743b625bf088c0a0108.mockapi.io/api/users', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        console.log('Inicio de sesión exitoso');
        navigate('/dashboard'); // Redirige al dashboard después del inicio de sesión exitoso
      } else {
        setError('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Error de red al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>Iniciar Sesión</button>
      </form>
      <p>No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
    </div>
  );
};

export default Login;