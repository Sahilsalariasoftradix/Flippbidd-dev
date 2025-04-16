import React from 'react';
import './InvestorServicesSection.css';
import { IMAGES } from '../../../utils/constants';

const InvestorServicesSection = () => {
  return (
    <section className="investor-services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-primary">Real Investors,</span> <span className="title-secondary">Real Leads</span>
            <div className="title-subtitle">in Real-Time</div>
          </h2>
        </div>
        
        <div className="services-cards">
          {/* FlippBidd Pro Services Card */}
          <div className="service-card pro-services-card" style={{ backgroundImage: `url(${IMAGES.FLIPPBIDD_PRO_BG})` }}>
            <div className="card-content">
              <div className="icon-wrapper">
                <img src={IMAGES.PERSON_ACHIEVEMENT} alt="Pro Services" className="service-icon" />
              </div>
              
              <div className="service-email">
                <img src={IMAGES.GRADIENT_MAIL} alt="Email" className="email-icon" />
                <span>LetsNetwork@flippbidd.com</span>
              </div>
              
              <h3 className="service-title">FlippBidd Pro-Services</h3>
              <p className="service-description">
                A premium platform connecting real estate professionals with top-tier investment opportunities, tools, and resources.
              </p>
              
              <a href="#contact" className="contact-button white-button"><span>Contact Us</span></a>
            </div>
          </div>
          
          {/* National Lenders Card */}
          <div className="service-card lenders-card" style={{ backgroundImage: `url(${IMAGES.NATIONAL_LENDERS_BG})` }}>
            <div className="card-content">
              <div className="icon-wrapper">
                <img src={IMAGES.NATIONAL_LENDER_ICON} alt="National Lenders" className="service-icon" />
              </div>
              
              <div className="service-email">
                <img src={IMAGES.GRADIENT_MAIL} alt="Email" className="email-icon" />
                <span>LetsNetwork@flippbidd.com</span>
              </div>
              
              <h3 className="service-title">National Lenders</h3>
              <p className="service-description">
                Stay ahead of the Competition! Get Real-Time Leads of Investors Nationally right to your Inbox or CRM's when they view a real-estate investment.
              </p>
              
              <a href="#contact" className="contact-button gradient-button">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorServicesSection; 