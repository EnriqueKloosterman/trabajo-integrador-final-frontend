import { useState } from 'react';
import Swal from 'sweetalert2';
import backgroundImage from '../assets/azul.webp'; 

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userEmail: '',
    userPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3030/api/v2/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 2000,
        });
        // Aquí podrías manejar la lógica de redirección o gestión de sesión
      } else {
        const errorData = await response.json();
        console.error('Error response data:', errorData);
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: errorData.message || 'Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.',
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Hubo un problema al conectarse con el servidor. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto p-6 bg-blue-100 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-black">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userEmail" className="block text-black">Correo Electrónico</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userPassword" className="block text-black">Contraseña</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              value={formData.userPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
