import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    image: ''
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
    
    // Enviar datos a la API
    try {
      const response = await fetch('https://6627d743b625bf088c0a0108.mockapi.io/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        console.log('Registro exitoso');
        navigate('/ruta-de-exito'); // Redirige a la ruta de éxito después del registro
      } else {
        setError('Error al registrar');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Error de red al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">Apellido:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
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
          <label htmlFor="image">Imagen:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;
