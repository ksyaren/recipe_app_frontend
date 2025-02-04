import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Stil dosyasını import ediyoruz

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt'); // JWT token'ını sil
    navigate('/login'); // Çıkış yapınca giriş sayfasına yönlendir
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-card">
        <h1>Admin Paneli</h1>
        <p>Hoş geldiniz, Admin!</p>

        {/* İşlem Butonları */}
        <div className="admin-actions">
          <button onClick={() => navigate('/admin/add-user')}>
            Kullanıcı Ekle
          </button>
          <button onClick={() => navigate('/admin/delete-user')}>
            Kullanıcı Sil
          </button>
          <button onClick={() => navigate('/admin/view-users')}>
            Kullanıcıları Görüntüle
          </button>
        </div>

        {/* Çıkış Butonu */}
        <button className="logout-button" onClick={handleLogout}>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;