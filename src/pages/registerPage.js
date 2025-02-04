import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './registerPage.css'; // Stil dosyasını import ediyoruz

const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Hata mesajı durumu
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: userName,
      email: email,
      password: password,
    };

    try {
      const response = await fetch('https://.........................../api/auth/local/register', {
        method: 'POST', // Doğru yöntem
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      

      const data = await response.json();

      if (response.ok) {
        // Kayıt başarılı, kullanıcıyı giriş sayfasına yönlendir
        console.log('Kayıt başarılı:', data);
        navigate('/login'); // Giriş sayfasına yönlendirme
      } else {
        // Hata durumunda hata mesajını ayarla
        setErrorMessage(data.message || 'Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error);
      setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Kayıt Ol</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Hata mesajını göster */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="userName">Kullanıcı Adı</label>
            <input
              type="text"
              id="userName"
              placeholder="Kullanıcı adınızı girin"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="register-button">Kayıt Ol</button>
        </form>
        <p className="login-text">
          Zaten bir hesabın var mı? <Link to="/login">Giriş yap</Link>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
