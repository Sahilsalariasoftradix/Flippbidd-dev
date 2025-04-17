import React from 'react';
import { IMAGES } from '../../../utils/constants';
import PropertyController from '../../../controllers/PropertyController';
import './FeatureSection.css';

const FeatureSection = () => {
  const features = PropertyController.getKeyFeatures();
  
  // Helper function to get absolute URL for images
  const getImageUrl = (path) => {
    return `${process.env.PUBLIC_URL}${path}`;
  };
  
  return (
    <section className="feature-section" style={{ backgroundImage: `url(${getImageUrl(IMAGES.FEATURE_BG)})` }}>
      <div className="container">
        <div className="feature-content">
          <div className="feature-text">
            <h2 className="feature-title">
              <span className="highlight">FlippBidd</span> Key Features
            </h2>
            
            <ul className="feature-list">
              {features.map(feature => (
                <li key={feature.id} className="feature-item">
                  <img src={getImageUrl(IMAGES.GRADIENT_TICK)} alt="Check" className="feature-iconn" />
                  <span>{feature.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection; 