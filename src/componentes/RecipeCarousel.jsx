import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

const RecipeCarousel = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
          try {
            const response = await fetch("http://localhost:3030/api/v2/recipes/recipes");
            if (!response.ok) {
              throw new Error("Failed to fetch recipes");
            }
            const data = await response.json();
            setRecipes(data.slice(0, 5));
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
        autoplaySpeed: 3500,
    };

    const handeleRecipeClick = (id) => {
        navigate(`/recipes/${id}`);
    }

    return (
        <div className="container mx-auto py-12 w-2/3">
            <Slider {...settings}>
                {recipes.map(recipe => (
                    <div key={recipe.recipeId} className="p-4" onClick={() => handeleRecipeClick(recipe.recipeId)}>
                        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover mb-4" />
                        <h3 className="text-2xl font-semibold text-center">{recipe.title}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default RecipeCarousel;
