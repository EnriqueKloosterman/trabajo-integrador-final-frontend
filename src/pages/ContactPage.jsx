import React from 'react';
import { useForm } from '../hook/useForm'; 

const ContactPage = () => {
    const { name, email, subject, message, onInputChange, onResetForm } = useForm({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
       
        console.log({ name, email, subject, message });
        onResetForm();
    };

    return (
        <div className='wrapper'>
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
            </form>
        </div>
    );
};

export default ContactPage;
