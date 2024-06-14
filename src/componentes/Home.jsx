import React from 'react';
import Menu from './Menu';
import Welcome from './Welcome';
import RecipeCarousel from './RecipeCarousel';

const Home = () => {
  return (
    <div>
      <RecipeCarousel />
      <Menu />
      <Welcome />
    </div>
  );
};

export default Home;
