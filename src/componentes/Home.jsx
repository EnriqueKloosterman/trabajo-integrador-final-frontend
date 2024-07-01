import Menu from './Menu';
import Welcome from './Welcome';
import RecipeCarousel from './RecipeCarousel';
import Article from './article';
import Recipe from './recipe';

const Home = () => {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <RecipeCarousel />
      <Menu />
      <Welcome />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4 text-center text-black">Recetas Populares</h2>
              <Recipe />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4 text-center text-black">Últimos Artículos</h2>
              <Article />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
