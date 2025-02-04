import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeleteUser.css'; // Stil dosyasını import ediyoruz

const DeleteUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Önce kullanıcıyı bul
      const findUserResponse = await fetch('https://recipe-app-backend.up.railway.app/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const users = await findUserResponse.json();

      // E-posta adresine göre kullanıcıyı bul
      const userToDelete = users.find((user) => user.email === email);

      if (!userToDelete) {
        setErrorMessage('Bu e-posta adresine sahip bir kullanıcı bulunamadı.');
        setSuccessMessage('');
        return;
      }

      // Kullanıcının şifresini doğrula
      const verifyResponse = await fetch('https://recipe-app-backend.up.railway.app/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      //const verifyData = await verifyResponse.json();

      if (verifyResponse.ok) {
        // Şifre doğru, kullanıcıyı sil
        const deleteResponse = await fetch(`https://recipe-app-backend.up.railway.app/api/users/${userToDelete.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (deleteResponse.ok) {
          // Kullanıcı başarıyla silindi
          setSuccessMessage('Kullanıcı başarıyla silindi!');
          setErrorMessage('');
          setTimeout(() => {
            navigate('/admin-dashboard'); // Admin paneline yönlendir
          }, 2000); // 2 saniye sonra yönlendir
        } else {
          // Hata durumunda hata mesajını ayarla
          setErrorMessage('Kullanıcı silinirken bir hata oluştu.');
          setSuccessMessage('');
        }
      } else {
        // Şifre yanlış
        setErrorMessage('Şifre yanlış. Lütfen tekrar deneyin.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error);
      setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="delete-user-container">
      <div className="delete-user-card">
        <h1>Kullanıcı Sil</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">E-posta</label>
            <input
              type="email"
              id="email"
              placeholder="Silinecek kullanıcının e-posta adresini girin"
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
              placeholder="Şifreyi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button-delete">Kullanıcıyı Sil</button>
        </form>
      </div>
    </div>
  );
};

export default DeleteUser;