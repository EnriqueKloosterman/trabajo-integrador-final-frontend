import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import logo from "../assets/logo-B-N.png";

const Navbar = () => {
  const { user, handleLogOut } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  return (
    <nav className="bg-gray-800 p-4 shadow-lg"> {/* Ajuste: color de fondo cambiado a bg-gray-800 */}
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-20 w-auto" style={{ filter: "drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))" }} /> {/* Ajuste: h-20 para hacer el logo más grande */}
        </Link>

        {/* Título */}
        <div className="flex-grow text-center flex items-center justify-center">
          <span role="img" aria-label="utensilios" className="mr-2" style={{ fontSize: '1.5rem' }}>🍴</span>
          <Link to="/" className="text-white text-2xl md:text-3xl font-semibold tracking-wider" style={{ textShadow: "1px 1px 3px #000000" }}>
            Aventuras en la Cocina
          </Link>
          <span role="img" aria-label="utensilios" className="ml-2" style={{ fontSize: '1.5rem' }}>🍴</span>
        </div>

        {/* Opciones de usuario */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-gray-400 transition-colors duration-300 font-semibold"
                style={{ textShadow: "1px 1px 3px #000000" }}
              >
                Ingresar
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-gray-400 transition-colors duration-300 font-semibold"
                style={{ textShadow: "1px 1px 3px #000000" }}
              >
                Crear Cuenta
              </Link>
            </>
          ) : (
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleDropdown}
                style={{ textShadow: "1px 1px 3px #000000" }}
              >
                <img
                  src={user.image}
                  alt="Avatar"
                  className="h-10 w-10 rounded-full object-cover border-2 border-white"
                />
                <span className="text-white font-semibold">{`${user.userName} ${user.userLastName}`}</span>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-semibold"
                    onClick={toggleDropdown}
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 font-semibold"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
