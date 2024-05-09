import React, { useState } from 'react';
import { useForm } from '../hook/useForm'; 

const ContactPage = () => {
    const { name, email, subject, message, onInputChange, onResetForm } = useForm({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        console.log({ name, email, subject, message });
        setSubmitted(true);
        onResetForm();
    };

    return (
        <div className='wrapper'>
            <div className='content-wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Contacto</h1>

                    <div className='input-group'>
                        <input
                            type='text'
                            name='name'
                            value={name}
                            onChange={onInputChange}
                            required
                            autoComplete='off'
                        />
                        <label htmlFor='name'>Nombre:</label>
                    </div>

                    <div className='input-group'>
                        <input
                            type='email'
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            required
                            autoComplete='off'
                        />
                        <label htmlFor='email'>Email:</label>
                    </div>

                    <div className='input-group'>
                        <input
                            type='text'
                            name='subject'
                            value={subject}
                            onChange={onInputChange}
                            required
                            autoComplete='off'
                        />
                        <label htmlFor='subject'>Asunto:</label>
                    </div>

                    <div className='input-group'>
                        <textarea
                            name='message'
                            value={message}
                            onChange={onInputChange}
                            required
                        />
                        <label htmlFor='message'>Mensaje:</label>
                    </div>

                    <button type='submit'>Enviar</button>
                    {submitted && <p className="confirmation-message">¡Gracias por contactarnos!</p>}
                </form>

                <div className='about-us'>
                    <h3>Nosotros</h3>
                    <p>Somos un equipo comprometido con el desarrollo de aplicaciones web.</p>
                    <p>Nuestro objetivo es crear soluciones innovadoras para nuestros clientes.</p>
                    <p>¡Gracias por visitarnos!</p>
                </div>
            </div>
        </div>
    );
};
    
export default ContactPage;
