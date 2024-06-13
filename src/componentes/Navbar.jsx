import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import logo from "../assets/logo.png";

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
    <nav className="bg-blue-100 p-4 shadow-md">
      <div className="container mx-auto flex flex-col items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-12 w-12" />
          </Link>
          <div className="flex-grow text-center">
            <Link to="/" className="text-black text-3xl font-semibold tracking-wide">
              Aventuras en la Cocina
            </Link>
          </div>
          <div className="flex-shrink-0 relative">
            {!user ? (
              <div className="flex space-x-4">
                <Link to="/login" className="text-black hover:text-gray-600 transition-colors duration-300">
                  Ingresar
                </Link>
                <Link to="/register" className="text-black hover:text-gray-600 transition-colors duration-300">
                  Crear Cuenta
                </Link>
              </div>
            ) : (
              <div className="relative">
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <img
                    src={user.image}
                    alt="Avatar"
                    className="h-10 w-10 rounded-full object-cover border-2 border-white"
                  />
                  <span className="text-black font-medium">{user.userName} {user.userLastName}</span>
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={toggleDropdown}
                    >
                      Perfil
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
