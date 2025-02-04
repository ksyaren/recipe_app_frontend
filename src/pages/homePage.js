import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import './homePage.css';

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="content">
          <h1>Hoşgeldiniz</h1>
          <p>
            Yemek tarifleri dünyasına adım attınız. Burada, lezzetli yemek tarifleri, pratik ipuçları ve mutfak sırları bulacaksınız. Farklı mutfaklardan tarifler deneyerek, damak zevkinizi zenginleştirin. Yemek yapmak sadece bir ihtiyaç değil, aynı zamanda bir sanattır. Bu sanatı keşfetmek ve kendinizi geliştirmek için doğru yerdesiniz. Haydi, mutfakta harikalar yaratmaya başlayalım!
          </p>
          {/* Link'e buton stili uyguluyoruz */}
          <Link to="/login" className="giris-button">Giriş Yap / Kayıt Ol</Link>
        </div>
        <div className="image-container">
          <img src="/images/chef.webp" alt="Chef" className="chef-image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;