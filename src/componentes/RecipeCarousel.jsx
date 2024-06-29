import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const RecipeCarousel = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
          try {
            const response = await fetch("http://localhost:3030/api/v2/recipes/recipes");
            if (!response.ok) {
              throw new Error("Failed to fetch recipes");
            }
            const data = await response.json();
            setRecipes(data);
          } catch (error) {
            console.error("Error fetching recipes:", error);
          }
        };
    
        fetchRecipes();
      }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <div className="container mx-auto py-12 w-2/3">
            {/* <h2 className="text-3xl font-semibold text-center mb-8">Latest Recipes</h2> */}
            <Slider {...settings}>
                {recipes.map(recipe => (
                    <div key={recipe.recipeId} className="p-4">
                        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover mb-4" />
                        <h3 className="text-2xl font-semibold text-center">{recipe.title}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default RecipeCarousel;
