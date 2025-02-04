import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/recipeCard';
import Header from '../components/header';
import './favoritesPage.css';

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteRecipes(storedFavorites);
  }, []);

  return (
    <div>
      <Header />
      <div className="favorites-page">
        <h1>Favori Tarifler</h1>
        <div className="recipe-list">
          {favoriteRecipes.length > 0 ? (
            favoriteRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                description={recipe.description}
                image={recipe.image}
                onFavoriteToggle={() => {}} // Favori toggle fonksiyonu burada kullanılmayacak
                isFavorited={true} // Her zaman favori olarak göster
              />
            ))
          ) : (
            <p>Favori tarif bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
