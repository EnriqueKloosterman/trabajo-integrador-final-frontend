import React from 'react';
import Menu from './Menu';
import Welcome from './Welcome';
import RecipeCarousel from './RecipeCarousel';
import Article from './article';
import Recipe from './recipe';

const Home = () => {
  return (
    <div>
      <RecipeCarousel />
      <Menu />
      <Welcome />
      <Recipe />
      <Article />
    </div>
  );
};

export default Home;
