import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header'; // Header componentini import edin
import './recipeDetailsPage.css';

const RecipeDetail = () => {
  const { id } = useParams(); // URL'den tarif ID'sini al
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) {
          throw new Error('Tarif detayları çekilemedi.');
        }
        const data = await response.json();
        setRecipe(data.meals[0]); // API'den gelen tarif detaylarını state'e kaydet
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>Hata: {error}</div>;
  }

  if (!recipe) {
    return <div>Tarif bulunamadı.</div>;
  }

  // Malzemeleri ve ölçüleri birleştir
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(
        `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`
      );
    }
  }

  // Yapılış adımlarını parçalara ayır
  const instructions = recipe.strInstructions.split('\n').filter(step => step.trim() !== '');

  return (
    <div>
      <Header /> {/* Header componentini ekleyin */}
      <div className="recipe-detail">
        <h1>{recipe.strMeal}</h1>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image-detail" />

        <div className="recipe-section">
          <h2>İçindekiler</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="recipe-section">
          <h2>Tarif</h2>
          <ol>
            {instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;