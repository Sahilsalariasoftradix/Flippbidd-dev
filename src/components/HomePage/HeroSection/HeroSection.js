import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGES, TEXT } from '../../../utils/constants';
import './HeroSection.css';

const HeroSection = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    //if (!address.trim()) return;

    setLoading(true);
    try {
      // Store the search address in localStorage for use in PropertySearch
      localStorage.setItem('searchAddress', address);
      
      // Redirect to the PropertySearch page
      navigate('/property-search');
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get absolute URL for images
  const getImageUrl = (path) => {
    return `${process.env.PUBLIC_URL}${path}`;
  };

  return (
    <section className="hero-section" style={{ backgroundImage: `url(${getImageUrl(IMAGES.HOME_BG)})` }}>
      <div className="overlay"></div>
      
      <div className="video-call-container">
        <img src={getImageUrl(IMAGES.VIDEO_CALL_BG)} alt="Video Call" className="video-call-image" />
      </div>
      
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">{TEXT.TAGLINE}</h1>
          
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <div className="search-icon">
                  <i className="fas fa-search"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search Property..."
                  className="search-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button type="submit" className="search-button" disabled={loading}>
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Download Section - Bottom */}
      <div className="container">
        <div className="download-section">
          <p className="download-text">{TEXT.FREE_DOWNLOAD}</p>
          <div className="app-buttons">
            <a href="https://apps.apple.com" className="app-button">
              <img src={getImageUrl(IMAGES.APPLE_STORE)} alt="App Store" />
            </a>
            <a href="https://play.google.com" className="app-button">
              <img src={getImageUrl(IMAGES.GOOGLE_PLAY)} alt="Google Play" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 