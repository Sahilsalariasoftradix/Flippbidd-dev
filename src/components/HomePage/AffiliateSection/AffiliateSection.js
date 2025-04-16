import React, { useState } from 'react';
import AffiliateModal from '../../common/AffiliateModal/AffiliateModal';
import './AffiliateSection.css';

const AffiliateSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const socialIcons = [
    { id: 1, name: 'TikTok', image: '/images/png/tiktok_ic.png', link: 'https://www.tiktok.com' },
    { id: 2, name: 'Facebook', image: '/images/png/fb_ic.png', link: 'https://www.facebook.com' },
    { id: 3, name: 'Messenger', image: '/images/png/massanger_ic.png', link: 'https://www.messenger.com' },
    { id: 4, name: 'Instagram', image: '/images/png/instagram_ic.png', link: 'https://www.instagram.com' },
    { id: 5, name: 'WhatsApp', image: '/images/png/whats_app_ic.png', link: 'https://www.whatsapp.com' },
    { id: 6, name: 'X', image: '/images/png/x_ic.png', link: 'https://twitter.com' },
  ];

  return (
    <section className="affiliate-section-wrapper">
      <div className="gradient-line"></div>
      <div className="affiliate-bg-container">
        <img src="/images/png/grow_community_bg.png" alt="Community Background" className="affiliate-bg-image" />
        <div className="affiliate-overlay"></div>
        <section className="affiliate-section">
          <div className="container">
            <div className="affiliate-content">
              <div className="affiliate-text">
                <h2 className="affiliate-title">Let's Grow our<br />Community Together</h2>
                <p className="affiliate-subtitle">Inquire about our Affiliate Program Today.</p>
                
                <div className="affiliate-buttons">
                  <button className="btn-become-affiliate" onClick={openModal}>
                    Become a FlippBidd Affiliate
                  </button>
                </div>
                
                <a href="mailto:LetsNetwork@FlippBidd.com" className="btn-email">
                  <div className="email-icon">
                    <img src="/images/svg/mail_ic.svg" alt="Email" />
                  </div>
                  <span>LetsNetwork@FlippBidd.com</span>
                </a>
              </div>
              
              <div className="social-icons">
                {socialIcons.map(icon => (
                  <a key={icon.id} href={icon.link} className="social-icon-link" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon">
                      <img src={icon.image} alt={icon.name} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Affiliate Modal */}
      <AffiliateModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </section>
  );
};

export default AffiliateSection; 