import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // la lógica para enviar el formulario, como una solicitud POST a tu servidor
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8">¡Contáctanos!</h1>
      <p className="text-lg text-gray-700">
        ¡Hola! Somos Malvina Pacheco, Florencia Da Rosa y Enrique Kloosterman, un grupo de estudiantes de programación full-stack.
        Estamos aquí para ayudarte en lo que necesites relacionado con aventuras en la cocina.
      </p>
      <p className="text-lg text-gray-700 mt-4">
        Si tienes preguntas, comentarios o sugerencias, no dudes en ponerte en contacto con nosotros.
        Puedes enviarnos un correo electrónico a <a href="mailto:info@aventurasenlacocina.com" className="text-green-500 hover:underline">info@aventurasenlacocina.com</a> o llenar el formulario de contacto a continuación.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="grid grid-cols-1 gap-6">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="block w-full px-4 py-3 placeholder-gray-500 border rounded-lg focus:outline-none focus:border-green-500"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Tu correo electrónico"
            className="block w-full px-4 py-3 placeholder-gray-500 border rounded-lg focus:outline-none focus:border-green-500"
            required
          />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Tu mensaje"
            className="block w-full px-4 py-3 placeholder-gray-500 border rounded-lg focus:outline-none focus:border-green-500"
            required
          ></textarea>
        </div>
        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 active:bg-gray-900 transition-colors duration-300"
          >
            Enviar Mensaje
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
