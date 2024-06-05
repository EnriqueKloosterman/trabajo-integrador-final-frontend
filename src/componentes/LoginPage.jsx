import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from './UserContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userEmail: '',
    userPassword: '',
  });

  const { handleLogin } = useContext(UserContext)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData); 
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
        console.error('Error response data:', errorData);  // Log the error response data
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
    <div className="bg-green-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
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
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
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
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green active:bg-green-700"
        >
          Iniciar Sesión
        </button>
      </form>
      <p className="mt-4 text-black">
        ¿No tienes una cuenta? <Link to="/register" className="text-green-500 hover:underline">Registrarse</Link>
      </p>
    </div>
  );
};

export default LoginPage;

