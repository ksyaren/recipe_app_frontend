import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './loginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Admin bilgilerini manuel olarak tanımlayın
  const adminEmail = 'email';
  const adminPassword = 'password';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      identifier: email,
      password: password,
    };

    try {
      // Strapi API'sine giriş isteği gönder
      const response = await fetch('https://................./api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Giriş başarılı, JWT token'ını kaydet
        localStorage.setItem('jwt', data.jwt);

        // E-posta ve şifre kontrolü yap
        if (email === adminEmail && password === adminPassword) {
          navigate('/admin-dashboard'); // Admin sayfasına yönlendir
        } else {
          navigate('/'); // Normal kullanıcıyı anasayfaya yönlendir
        }
      } else {
        // Hata durumunda hata mesajını ayarla
        setErrorMessage(data.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error);
      setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Giriş Yap</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="E-mail adresinizi girin"
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
              placeholder="Şifrenizi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Giriş Yap</button>
        </form>
        <p className="signup-text">
          Hesabın yoksa <Link to="/register">kayıt ol</Link>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;