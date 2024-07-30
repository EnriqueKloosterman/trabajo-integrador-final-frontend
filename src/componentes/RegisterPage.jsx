import { useState } from 'react';
import Swal from 'sweetalert2';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userLastName: '',
    userEmail: '',
    userPassword: '',
    image: null,
  });
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      const response = await fetch('http://localhost:3030/api/v2/auth/register', {
        method: 'POST',
        body: formDataToSend,
      });
      if (response.status === 201) { 
        Swal.fire({
          icon: 'success',
          title: `Registro exitoso, ¡Bienvenido ${formData.userName}!`,
          showConfirmButton: false,
          timer: 2000,
        });
        setFormData({
          userName: '',
          userLastName: '',
          userEmail: '',
          userPassword: '',
          image: null,
        });
        navigate('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrarse',
          text: 'Hubo un problema al crear tu cuenta. Por favor, inténtalo de nuevo.',
        });
      }
    } catch (error) {
      console.error('Error al registrarse:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al registrarse',
        text: 'Hubo un problema al crear tu cuenta. Por favor, inténtalo de nuevo.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center opacity-85" style={{ backgroundImage: `url(${logo})` }}>
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="userName" className="block text-gray-700">Nombre</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="userLastName" className="block text-gray-700">Apellido</label>
            <input
              type="text"
              id="userLastName"
              name="userLastName"
              value={formData.userLastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="userEmail" className="block text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="userPassword" className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              value={formData.userPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-700">Imagen</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-900 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
