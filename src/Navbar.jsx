import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from "./assets/logo.png" 

export const Navbar = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const onLogout = () => {
        navigate('/login', {
            replace: true,
        });
    };

    return (
        <>
            <header>
                <h1>
                    <Link to='/'>
                        <img src={logo} alt="Aventuras en la cocina " style={{ maxWidth: '100px', maxHeight: '50px' }} />
                    </Link>
                </h1>

                {state?.logged ? (
                    <div className='user'>
                        <span className='username'>{state?.name}</span>
                        <button className='btn-logout' onClick={onLogout}>
                            Cerrar sesión
                        </button>
                    </div>
                ) : (
                    <nav>
                        <Link to='/login'>Iniciar sesión</Link>
                        <Link to='/register'>Registrarse</Link>
						
                    </nav>
                )}
            </header>

            <Outlet />
        </>
    );
};
