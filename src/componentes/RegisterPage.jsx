import { useState } from 'react';
import Swal from 'sweetalert2';
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userLastName: '',
    userEmail: '',
    userPassword: '',
    image: null,
  });
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
    <div className="container mx-auto p-6 bg-blue-100 rounded-lg shadow-lg max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-black">Nombre</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userLastName" className="block text-black">Apellido</label>
          <input
            type="text"
            id="userLastName"
            name="userLastName"
            value={formData.userLastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
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
        <div className="mb-4">
          <label htmlFor="image" className="block text-black">Imagen</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};
export default RegisterPage;