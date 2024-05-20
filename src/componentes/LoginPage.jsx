import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hook/useForm';

export const LoginPage = () => {
	const navigate = useNavigate();

	const { email, password, onInputChange, onResetForm } =
		useForm({
			email: '',
			password: '',
		});

	const onLogin = e => {
		e.preventDefault();

		// Validación de credenciales aquí

		// Simulando una autenticación exitosa
		const fakeLogin = true;

		if (fakeLogin) {
			navigate('/dashboard', {
				replace: true,
				state: {
					logged: true,
					name: 'Usuario', // Cambiar por el nombre de usuario real si lo tienes
				},
			});

			onResetForm();
		} else {
			// Manejar error de autenticación aquí
			console.error('Error: credenciales inválidas');
		}
	};

	return (
		<div className='wrapper'>
			<form onSubmit={onLogin}>
				<h1>Iniciar Sesión</h1>

				<div className='input-group'>
					<input
						type='email'
						name='email'
						id='email'
						value={email}
						onChange={onInputChange}
						required
						autoComplete='off'
					/>
					<label htmlFor='email'>Email:</label>
				</div>
				<div className='input-group'>
					<input
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={onInputChange}
						required
						autoComplete='off'
					/>
					<label htmlFor='password'>Contraseña:</label>
				</div>

				<button className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green active:bg-green-700'>Entrar</button>
			</form>
		</div>
	);
};
