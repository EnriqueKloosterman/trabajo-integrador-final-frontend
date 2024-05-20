// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from '../hook/useForm';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';

// export const RegisterPage = () => {
//     const navigate = useNavigate();

//     const { name, email, password, lastname, onInputChange, onResetForm } =
//         useForm({
//             name: '',
//             email: '',
//             password: '',
//             lastname: '',
//         });

//     const [image, setImage] = useState(null);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [crop, setCrop] = useState({ aspect: 1 / 1, width: 50, height: 50 });
//     const [completedCrop, setCompletedCrop] = useState(null);

//     const onImageChange = (e) => {
//         const file = e.target.files[0];
//         setImage(file);
//         setImagePreview(URL.createObjectURL(file));
//     };

//     const onImageLoaded = (image) => {
//         setImagePreview(image);
//     };

//     const onCropComplete = (crop) => {
//         setCompletedCrop(crop);
//     };

//     const getCroppedImage = async (image, crop) => {
//         if (!crop || !image) {
//             return null;
//         }

//         const canvas = document.createElement('canvas');
//         const scaleX = image.naturalWidth / image.width;
//         const scaleY = image.naturalHeight / image.height;
//         canvas.width = crop.width;
//         canvas.height = crop.height;
//         const ctx = canvas.getContext('2d');

//         ctx.drawImage(
//             image,
//             crop.x * scaleX,
//             crop.y * scaleY,
//             crop.width * scaleX,
//             crop.height * scaleY,
//             0,
//             0,
//             crop.width,
//             crop.height
//         );

//         return new Promise((resolve, reject) => {
//             canvas.toBlob((blob) => {
//                 if (!blob) {
//                     reject(new Error('Canvas is empty'));
//                     return;
//                 }
//                 const fileUrl = URL.createObjectURL(blob);
//                 resolve(fileUrl);
//             }, 'image/jpeg');
//         });
//     };

//     const onRegister = async (e) => {
//         e.preventDefault();

//         const croppedImageUrl = await getCroppedImage(imagePreview, completedCrop);

//         navigate('/dashboard', {
//             replace: true,
//             state: {
//                 logged: true,
//                 name,
//                 image: croppedImageUrl, 
//             },
//         });

//         onResetForm();
//         setImage(null);
//         setImagePreview(null);
//         setCompletedCrop(null);
//     };

//     return (
//         <div className='wrapper'>
//             <form onSubmit={onRegister}>
//                 <h1>Registrarse</h1>

//                 <div className='input-group'>
//                     <input
//                         type='text'
//                         name='name'
//                         id='name'
//                         value={name}
//                         onChange={onInputChange}
//                         required
//                         autoComplete='off'
//                     />
//                     <label htmlFor='name'>Nombre:</label>
//                 </div>

//                 <div className='input-group'>
//                     <input
//                         type='text'
//                         name='lastname'
//                         id='lastname'
//                         value={lastname}
//                         onChange={onInputChange}
//                         required
//                         autoComplete='off'
//                     />
//                     <label htmlFor='lastname'>Apellido:</label>
//                 </div>

//                 <div className='input-group'>
//                     <input
//                         type='email'
//                         name='email'
//                         id='email'
//                         value={email}
//                         onChange={onInputChange}
//                         required
//                         autoComplete='off'
//                     />
//                     <label htmlFor='email'>Email:</label>
//                 </div>

//                 <div className='input-group'>
//                     <input
//                         type='password'
//                         name='password'
//                         id='password'
//                         value={password}
//                         onChange={onInputChange}
//                         required
//                         autoComplete='off'
//                     />
//                     <label htmlFor='password'>Contraseña:</label>
//                 </div>

//                 <div className='input-group'>
//                     <input
//                         type='file'
//                         name='image'
//                         id='image'
//                         accept='image/*'
//                         onChange={onImageChange}
//                         required
//                     />
//                     <label htmlFor='image'>Imagen:</label>
//                 </div>

//                 {imagePreview && (
//                     <ReactCrop
//                         src={imagePreview}
//                         crop={crop}
//                         onImageLoaded={onImageLoaded}
//                         onComplete={onCropComplete}
//                         onChange={(newCrop) => setCrop(newCrop)}
//                     />
//                 )}

//                 <button type='submit'>Registrarse</button>
//             </form>
//         </div>
//     );
// };
