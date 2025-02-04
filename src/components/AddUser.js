import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddUser.css'; // Stil dosyasını import ediyoruz

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    try {
      // Strapi API'sine kullanıcı kaydı isteği gönder
      const response = await fetch('https://recipe-app-backend.up.railway.app/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Kullanıcı başarıyla eklendi
        setSuccessMessage('Kullanıcı başarıyla eklendi!');
        setErrorMessage('');
        setTimeout(() => {
          navigate('/admin-dashboard'); // Admin paneline yönlendir
        }, 2000); // 2 saniye sonra yönlendir
      } else {
        // Hata durumunda hata mesajını ayarla
        setErrorMessage(data.message || 'Kullanıcı eklenirken bir hata oluştu.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error);
      setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="add-user-container">
      <div className="add-user-card">
        <h1>Kullanıcı Ekle</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              placeholder="Kullanıcı adı girin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">E-posta</label>
            <input
              type="email"
              id="email"
              placeholder="E-posta adresi girin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              placeholder="Şifre girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button-user">Kullanıcı Ekle</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;