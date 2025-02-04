import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginPage'; // LoginPage bileşenini import edin
import RegisterPage from './pages/registerPage'; // RegisterPage bileşenini import edin
import HomePage from './pages/homePage'; // HomePage bileşenini import edin
import RecipePage from './pages/recipePage'; // Tarifler sayfası
import RecipeDetail from './pages/recipeDetailsPage';
import FavoritesPage from './pages/favoritesPage';
import AdminDashboard from './pages/AdminDashboard';
import AddUser from './components/AddUser';
import DeleteUser from './components/DeleteUser';
import ViewUsers from './components/showUser';




function App() {
  return (
    <Router>
      <Routes>
        {/* Ana sayfa */}
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipePage />} />
        {/* Giriş sayfası */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<FavoritesPage />} /> {/* Düzgün kullanım */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* Kayıt sayfası */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/add-user" element={<AddUser />} />
        <Route path="/admin/delete-user" element={<DeleteUser />} />
        <Route path="/admin/view-users" element={<ViewUsers />} />
      </Routes>
    </Router>
  );
}

export default App;