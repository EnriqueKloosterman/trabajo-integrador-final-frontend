import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import logo from "../assets/logo-B-N.png";

const Navbar = () => {
  const { user, handleLogOut } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setDropdownOpen(false);
    setMenuOpen(false);
  }, [user]);

  return (
    <nav className="bg-teal-600 p-4 shadow-lg relative z-50"> 
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-20 w-auto" style={{ filter: "drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))" }} />
        </Link>

        {/* Título */}
        <div className="flex-grow text-center flex items-center justify-center">
          <span role="img" aria-label="utensilios" className="mr-2" style={{ fontSize: '1.5rem' }}>🍴</span>
          <Link to="/" className="text-white text-sm md:text-3xl lg:text-xxl font-semibold tracking-wider" style={{ textShadow: "1px 1px 3px #000000" }}>
            Aventuras en la Cocina
          </Link>
          <span role="img" aria-label="utensilios" className="ml-2" style={{ fontSize: '1.5rem' }}>🍴</span>
        </div>

        {/* Menú para pantallas pequeñas */}
        <div className="lg:hidden">
          {user ? (
            <div className="relative">
              <img
                src={user.image}
                alt="Avatar"
                className="h-10 w-10 rounded-full object-cover border-2 border-white cursor-pointer"
                onClick={toggleMenu}
              />
              {menuOpen && (
                <div className="absolute right-0 top-14 w-48 bg-white rounded-md shadow-lg py-1 z-50"> 
                  {/* <div className="flex flex-col items-center px-4 py-2">
                    <span className="text-gray-800 font-semibold mb-2">{`${user.userName} ${user.userLastName}`}</span>
                  </div> */}
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-semibold"
                    onClick={toggleMenu}
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={() => { handleLogOut(); toggleMenu(); }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 font-semibold"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          )}
          {menuOpen && !user && (
            <div className="absolute right-0 top-14 w-48 bg-white rounded-md shadow-lg py-1 z-50"> 
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Ingresar
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Crear Cuenta
              </Link>
            </div>
          )}
        </div>

        {/* Menú de navegación en pantallas grandes */}
        <div className="hidden lg:flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-white text-sm md:text-base lg:text-lg hover:text-gray-400 transition-colors duration-300 font-semibold"
                style={{ textShadow: "1px 1px 3px #000000" }}
              >
                Ingresar
              </Link>
              <Link
                to="/register"
                className="text-white text-sm md:text-base lg:text-lg hover:text-gray-400 transition-colors duration-300 font-semibold"
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
                  className="h-14 w-14 rounded-full object-cover border-2 border-white"
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
                    onClick={() => { handleLogOut(); toggleDropdown(); }}
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
