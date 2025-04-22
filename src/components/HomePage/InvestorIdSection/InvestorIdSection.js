import React, { useState } from 'react';
import { IMAGES } from '../../../utils/constants';
import VerifiedInvestorModal from '../../common/VerifiedInvestorModal/VerifiedInvestorModal';
import './InvestorIdSection.css';

const InvestorIdSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper function to get absolute URL for images
  const getImageUrl = (path) => {
    return `${window.location.origin}${path}`;
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="investor-id-section">
      <div className="investor-id-container">
        <div className="investor-id-content">
          <div className="white-card-container">
            <div className="investor-id-card">
              <h2 className="card-title">FREE Verified Investor ID CARD</h2>
              <p className="card-subtitle">Get on the Map and let our sellers reach you DIRECT!</p>
              <button className="card-button" onClick={openModal}>Click Here</button>
            </div>
          </div>
          <div className="investor-id-image">
            <img 
              src={getImageUrl(IMAGES.VERIFIED_INVESTOR_BG)} 
              alt="Verified Investor" 
              className="investor-bg-image" 
            />
          </div>
        </div>
      </div>
      
      {/* Verified Investor Modal */}
      <VerifiedInvestorModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </section>
  );
};

export default InvestorIdSection;