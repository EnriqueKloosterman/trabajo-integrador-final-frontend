import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from './UserContext';
import logo from '../assets/azul.webp';  

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userEmail: '',
    userPassword: '',
  });

  const { handleLogin } = useContext(UserContext);
  const navigate = useNavigate();

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
        handleLogin(data, data.token);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/');
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
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${logo})` }}>
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-4 text-gray-700">
          ¿No tienes una cuenta? <Link to="/register" className="text-blue-500 hover:underline">Registrarse</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
