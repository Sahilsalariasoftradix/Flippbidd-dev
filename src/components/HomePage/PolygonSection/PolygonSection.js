import React from 'react';
import { IMAGES } from '../../../utils/constants';
import PropertyController from '../../../controllers/PropertyController';
import './PolygonSection.css';

const PolygonSection = () => {
  const polygonFeatures = PropertyController.getPolygonFeatures();
  
  return (
    <section className="polygon-section">
      <div className="polygon-content d-flex">
        <div className="polygon-features">
          <h2 className="polygon-title">
            <span className="highlight">Polygon</span> Lead Search
          </h2>
          
          <div className="feature-grid">
            {polygonFeatures.map(feature => (
              <div key={feature.id} className="polygon-feature-item">
                <div className="polygon-feature-icon-container">
                  <img src={IMAGES.BLUE_TICK} alt="Check" className="polygon-feature-icon" />
                </div>
                <span className="polygon-feature-text">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="polygon-map-container">
          <img 
            src={IMAGES.POLYGON_BG} 
            alt="Polygon Lead Map" 
            className="polygon-map"
            style={{ background: 'transparent' }}
          />
        </div>
      </div>
    </section>
  );
};

export default PolygonSection; 