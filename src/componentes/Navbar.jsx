import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
function Navbar() {
  return (
    <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 py-4 mt-3 rounded-md">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <img src={logo} alt="Logo Travesuras en la cocina" style={{maxWidth: '100px', maxHeight: '100px'}}/>
        <Link to="/" className="text-4xl font-extrabold text-white text-opacity-90 hover:text-opacity-100 transition-colors duration-300 shadow-lg">
          Aventuras en la cocina
        </Link>
        <ul className="flex space-x-6 text-lg font-semibold text-white">
          <li>
            <Link to="/" className="hover:text-green-300">Inicio</Link>
          </li>
          <li>
            <Link to="/recipes" className="hover:text-green-300">Recetas</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-green-300">Contacto</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-green-300">Iniciar Sesión</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
