import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../components/recipeCard';
import Header from '../components/header';
import './recipePage.css';

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || '';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Veri çekme işlemi başarısız oldu.');
        }
        const data = await response.json();
        setRecipes(data.meals || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchTerm]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteRecipes(storedFavorites);
  }, []);

  const handleFavoriteToggle = (recipe) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    
    if (storedFavorites.some(r => r.id === recipe.id)) {
      const updatedFavorites = storedFavorites.filter(r => r.id !== recipe.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
      setFavoriteRecipes(updatedFavorites);
    } else {
      const updatedFavorites = [...storedFavorites, recipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
      setFavoriteRecipes(updatedFavorites);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>Hata: {error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="recipe-page">
        <h1>Tarifler</h1>
        <div className="recipe-list">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                id={recipe.idMeal}
                title={recipe.strMeal}
                description={recipe.strInstructions.substring(0, 100) + '...'}
                image={recipe.strMealThumb}
                onFavoriteToggle={handleFavoriteToggle} // Favori toggle fonksiyonu
                isFavorited={favoriteRecipes.some(r => r.id === recipe.idMeal)} // Tarifi favorilerde kontrol et
              />
            ))
          ) : (
            <p>Hiç tarif bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
