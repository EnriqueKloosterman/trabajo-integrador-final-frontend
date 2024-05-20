import { Link } from 'react-router-dom';

function NotFound() {
  const notFoundImageUrl = 'https://imgs.search.brave.com/f_CL_cwyFcTz7as4DFasAY9r7VVWKNiCx_wc11phGGA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/cGFnZS00MDQtZm91/bmQtd2lyZS13aXRo/LXNvY2tldF84MDMy/OC0yMzMuanBnP3Np/emU9NjI2JmV4dD1q/cGc'; // Reemplaza con la URL real de la imagen

  return (
    <div className="container mx-auto p-4 text-center flex justify-center items-center h-screen">
      <div>
        <h1 className="text-4xl font-bold text-lime-700 mb-4">Error 404 - Página no encontrada</h1>
        <p className="text-lg text-gray-700 mb-4">
          Lo sentimos, la página que estás buscando no se encuentra disponible.
        </p>
        <img src={notFoundImageUrl} alt="Error 404 - No encontrado" />
        <p className="text-lg text-gray-700 mt-4">
          ¿Deseas volver a la <Link to="/">página de inicio</Link>?
        </p>
      </div>
    </div>
  );
}

export default NotFound;

