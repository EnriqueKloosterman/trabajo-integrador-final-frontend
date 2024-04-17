import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Contacto = () => {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-5 flex flex-col justify-between">
        <div className="bg-slate-200/50 rounded-md">
          <h3 className="text-center text-2xl font-bold mt-10 bg-slate-300/50 md:mx-5 md:p-1">
            Formulario de Contacto
          </h3>
          <form onSubmit={handleFormSubmit}>
            <div className="p-5 flex flex-col">
              <label htmlFor="name" className="text-sm md:text-lg lg:text-xl mb-2">
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                className="w-full p-2 rounded-md border focus:outline-none focus:border-indigo-400 focus:border-2"
              />
            </div>
            <div className="p-5 flex flex-col">
              <label htmlFor="email" className="text-sm md:text-lg lg:text-xl mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                className="w-full p-2 rounded-md border focus:outline-none focus:border-indigo-400 focus:border-2"
              />
            </div>
            <div className="p-5 flex flex-col">
              <label htmlFor="message" className="text-sm md:text-lg lg:text-xl mb-2">
                Mensaje:
              </label>
              <textarea
                id="message"
                name="message"
                onChange={handleInputChange}
                value={formData.message}
                className="w-full p-2 rounded-md border focus:outline-none focus:border-indigo-400 focus:border-2"
              />
            </div>
            <div className="flex justify-end p-5 ">
              <button
                type="submit"
                className="bg-indigo-400 text-md rounded-md font-bold px-2 py-1 text-white "
              >
                Enviar
              </button>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Contacto;
