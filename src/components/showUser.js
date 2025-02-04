import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './showUser.css'; // Stil dosyasını import ediyoruz

const ViewUsers = () => {
  const [users, setUsers] = useState([]); // Kullanıcıları tutacak state
  const [errorMessage, setErrorMessage] = useState(''); // Hata mesajı
  const [loading, setLoading] = useState(true); // Yükleme durumu
  const navigate = useNavigate();

  // Kullanıcıları API'den çekme işlemi
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://recipe-app-backend.up.railway.app/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Yanıtı:', data); // API yanıtını konsola yazdır

        // API yanıtındaki kullanıcıları state'e kaydet
        if (Array.isArray(data)) {
          setUsers(data); // Kullanıcıları state'e kaydet
        } else {
          setUsers([]); // Eğer data bir dizi değilse boş dizi kullan
        }
        setLoading(false); // Yükleme tamamlandı
      } catch (error) {
        console.error('Bir hata oluştu:', error);
        setErrorMessage('Kullanıcılar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        setUsers([]); // Hata durumunda users'ı boş dizi yap
        setLoading(false); // Yükleme tamamlandı
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="view-users-container">
      <div className="view-users-card">
        <h1>Kullanıcıları Görüntüle</h1>

        {/* Hata mesajı */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Yükleme durumu */}
        {loading ? (
          <p>Yükleniyor...</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Kullanıcı Adı</th>
                <th>E-posta</th>
                {/* Şifre alanını kaldırın veya gizleyin */}
              </tr>
            </thead>
            <tbody>
              {/* Kullanıcıları listele */}
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    {/* Şifre alanını kaldırın veya gizleyin */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">Kullanıcı bulunamadı.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Geri dön butonu */}
        <button className="back-button" onClick={() => navigate('/admin-dashboard')}>
          Geri Dön
        </button>
      </div>
    </div>
  );
};

export default ViewUsers;