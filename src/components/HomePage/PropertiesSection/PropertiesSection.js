import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../../../utils/constants';
import './PropertiesSection.css';

const PropertiesSection = () => {
  // Sample properties data - in a real app, this would come from an API
  const properties = [
    {
      id: 1,
      type: 'Multi Family Property',
      beds: 2,
      baths: 2,
      sqft: 1000,
      address: '345 E 24th St, New York, NY 10010, USA',
      price: 25000
    },
    {
      id: 2,
      type: 'Multi Family Property',
      beds: 3,
      baths: 3,
      sqft: 1500,
      address: '345 E 25th St, New York, NY 10010, USA',
      price: 25000
    },
    {
      id: 3,
      type: 'Multi Family Property',
      beds: 3,
      baths: 2,
      sqft: 1000,
      address: '345 E 24th St, New York, NY 10010, USA',
      price: 25000
    },
    {
      id: 4,
      type: 'Multi Family Property',
      beds: 2,
      baths: 2,
      sqft: 1500,
      address: '345 E 24th St, New York, NY 10010, USA',
      price: 25000
    },
    {
      id: 5,
      type: 'Multi Family Property',
      beds: 3,
      baths: 2,
      sqft: 1500,
      address: '345 E 24th St, New York, NY 10010, USA',
      price: 25000
    },
    {
      id: 6,
      type: 'Multi Family Property',
      beds: 2,
      baths: 2,
      sqft: 1000,
      address: '345 E 24th St, New York, NY 10010, USA',
      price: 25000
    }
  ];

  // Helper function to get absolute URL for images
  const getImageUrl = (path) => {
    return `${process.env.PUBLIC_URL}${path}`;
  };

  return (
    <section className="properties-section">
      <div className="container">
        <h2 className="section-title">
          <span className="normal-text" style={{ color: '#575665' }}>New</span>{' '}
          <span className="highlight">PROPERTIES</span>
        </h2>
        
        <div className="properties-grid">
          {properties.map(property => (
            <div className="property-card" key={property.id}>
              <div className="property-image">
                <img src={getImageUrl(IMAGES.DEMO_PROPERTY_BG)} alt={property.type} />
              </div>
              <div className="property-info">
                <div className="property-category-wrapper">
                  <div className="property-category">Wholesale</div>
                </div>
                <h3 className="property-title">{property.type}</h3>
                <div className="property-features">
                  <span className="feature"><i className="fas fa-bed"></i> {property.beds}</span>
                  <span className="feature">
                    <img 
                      src={getImageUrl(IMAGES.SHOWER_ICON)} 
                      alt="Baths" 
                      style={{ width: '19px', height: '19px', marginRight: '5px' }}
                    />
                    {property.baths}
                  </span>
                  <span className="feature">
                    <img 
                      src={getImageUrl(IMAGES.SQUARE_FOOT_ICON)} 
                      alt="Square Feet" 
                      style={{ width: '14px', height: '14px', marginRight: '5px' }}
                    />
                    {property.sqft} sqft
                  </span>
                </div>
                <div className="property-address">
                  <img 
                    src={getImageUrl(IMAGES.LOCATION_ICON)} 
                    alt="Location" 
                    style={{ width: '15px', height: '15px', marginRight: '5px' , marginTop: '2px' }}
                  />
                  {property.address}
                </div>
                <div className="property-actions">
                  <Link to={`/property/${property.id}`} className="view-details-btn">View Details</Link>
                  <div className="property-price">
                    <img 
                      src={getImageUrl(IMAGES.DOLLAR_ICON)} 
                      alt="Dollar" 
                      style={{ width: '20px', height: '20px', marginRight: '5px', marginTop: '2px' }}
                    />
                    {property.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="see-more-container">
          <Link to="/properties" className="see-more-btn">See More</Link>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection; 