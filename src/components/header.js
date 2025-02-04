import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate('/recipes', { state: { searchTerm } });
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="link">Ana Sayfa</Link>
        <Link to="/recipes" className="link">Tarifler</Link>
        <Link to="/favorites" className="link">Favoriler</Link>
      </nav>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Ara..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="search-button" onClick={handleSearch}>Ara</button>
      </div>
    </header>
  );
};

export default Header;