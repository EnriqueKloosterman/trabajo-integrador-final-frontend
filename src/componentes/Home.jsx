import Menu from './Menu';
import Welcome from './Welcome';
import RecipeCarousel from './RecipeCarousel';
import Article from './article';


const Home = () => {
  return (
    <div>
      <RecipeCarousel />
      <Menu />
      <Welcome />
      <Article />
    </div>
  );
};

export default Home;