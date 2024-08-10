import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from 'sweetalert2';

function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
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
    emailjs.sendForm('service_tr6oqxn', 'template_bcdw728', form.current, 'H4E7nNLLCarlAy5XH')
      .then((result) => {
        console.log(result.text);
        setFormData({
          user_name: "",
          user_email: "",
          message: "",
        });
        Swal.fire({
          icon: 'success',
          title: '¡Mensaje enviado!',
          text: 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.',
          timer: 3000
        });
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <div className="container mx-auto p-4 bg-lime-50">
      <h1 className="text-4xl font-bold text-black mb-8">¡Contáctanos!</h1>
      <p className="text-lg text-gray-700">
        ¡Hola! Somos Malvina Pacheco, Florencia Da Rosa y Enrique Kloosterman, un grupo de estudiantes de programación full-stack.
        Estamos aquí para ayudarte en lo que necesites relacionado con aventuras en la cocina.
      </p>
      <p className="text-lg text-gray-700 mt-4">
        Si tienes preguntas, comentarios o sugerencias, no dudes en ponerte en contacto con nosotros.
        Puedes enviarnos un correo electrónico a <a href="mailto:info@aventurasenlacocina.com" className="text-black hover:underline">info@aventurasenlacocina.com</a> o llenar el formulario de contacto a continuación.
      </p>

      <form ref={form} onSubmit={handleSubmit} className="mt-8">
        <div className="grid grid-cols-1 gap-6">
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="block w-full px-4 py-3 placeholder-gray-500 border rounded-lg focus:outline-none focus:border-black"
            required
          />
          <input
            type="email"
            id="user_email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            placeholder="Tu correo electrónico"
            className="block w-full px-4 py-3 placeholder-gray-500 border rounded-lg focus:outline-none focus:border-black"
            required
          />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Tu mensaje"
            className="block w-full px-4 py-3 placeholder-gray-500 border rounded-lg focus:outline-none focus:border-black"
            required
          ></textarea>
        </div>
        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-800 text-white font-semibold px-8 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 active:bg-gray-900 transition-colors duration-300"
          >
            Enviar Mensaje
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
