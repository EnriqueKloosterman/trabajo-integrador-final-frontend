import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

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
                        <img src="logo.png" alt="Aventuras en la cocina " />
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
