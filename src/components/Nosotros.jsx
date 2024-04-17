import Footer from './Footer';
import Header from './Header';

const Nosotros = () => {
  return (
    <>
      <Header />
      <div className='flex flex-col justify-between'>
      <div className='w-5/6 bg-white/50 text-center md:text-left text-sm md:text-lg lg:text-xl md:font-bold mx-auto p-5 rounded-md my-[10%]'>
        <h2>Nosotros</h2>
        <p>Somos un grupo de estudiantes desarrollando esta aplicación web como parte de nuestro proyecto de aprendizaje. Este equipo está conformado por Enrique, Florencia y Malvina.</p>
        <p>Nuestro objetivo es adquirir experiencia práctica en el desarrollo de aplicaciones web y mejorar nuestras habilidades en React.</p>
        <p>¡Estamos entusiasmados en compartir este proyecto con ustedes!</p>
      </div>
      </div>
      <Footer />
    </>
  );
};



export default Nosotros;
