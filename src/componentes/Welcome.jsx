
import aventurasImage from '../assets/aventuras-2.jpg'; 
function Welcome() {
  return (
    <section className="welcome p-6 bg-gray-100 rounded-md shadow-md mt-5">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/3 mb-4 md:mb-0">
          <img src={aventurasImage} alt="Aventuras en la Cocina" className="w-full rounded-md shadow-md" />
        </div>
        <div className="md:w-2/3 text-center md:text-left md:ml-4">
          <h2 className="text-xl font-bold mb-4">Bienvenidos a "Aventuras en la Cocina"</h2>
          <p className="mb-4">
            ¡Hola a todos y bienvenidos a "Aventuras en la Cocina"! En este espacio creado con amor y dedicación para todos los amantes de la cocina, 
            desde principiantes hasta expertos. Queremos compartir con ustedes la pasión y el gozo que 
            hemos encontrado en el arte culinario. Aquí, todos tenemos una cosa en común: el amor
            por la buena comida y las experiencias inolvidables que nacen en la cocina...
          </p>
        </div>
      </div>
    </section>
  );
}

export default Welcome;

