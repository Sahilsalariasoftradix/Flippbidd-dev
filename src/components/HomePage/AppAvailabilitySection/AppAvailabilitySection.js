import React from 'react';
import './AppAvailabilitySection.css';
import { IMAGES } from '../../../utils/constants';

const AppAvailabilitySection = () => {
  // Helper function to get absolute URL for images
  const getImageUrl = (path) => {
    return `${process.env.PUBLIC_URL}${path}`;
  };
  
  return (
    <section className="app-availability-section" style={{ backgroundImage: `url(${getImageUrl(IMAGES.AVAILABLE_STORE_BG)})` }}>
      <div className="container">
        <div className="app-availability-content">
          <h2 className="availability-title">Available Now on AppStore & GooglePlay</h2>
          <p className="availability-subtitle">WebApp Package Coming Spring 2025!</p>
          
          <div className="app-store-buttons">
            <a href={process.env.REACT_APP_FLIPPBID_APPLE_STORE_URL} className="store-button" target="_blank" rel="noopener noreferrer">
              <img src={getImageUrl(IMAGES.APPLE_STORE)} alt="Download on the App Store" />
            </a>
            <a href={process.env.REACT_APP_FLIPPBID_GOOGLE_PLAY_URL} className="store-button" target="_blank" rel="noopener noreferrer">
              <img src={getImageUrl(IMAGES.GOOGLE_PLAY)} alt="Get it on Google Play" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppAvailabilitySection; 