import React from 'react';
import './InvestorServicesSection.css';
import { IMAGES } from '../../../utils/constants';

const InvestorServicesSection = () => {
  return (
    <section className="investor-services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="text-[36px] font-semibold bg-gradient-to-r from-[#C830EB] via-[#00ACDB] to-[#00ACDB] inline-block text-transparent bg-clip-text">
            <span >Real Investors,</span> <span >Real Leads</span>
            <div >in Real-Time</div>
          </h2>
        </div>
        
        <div className="services-cards">
          {/* FlippBidd Pro Services Card */}
          <div className="service-card pro-services-card" style={{ backgroundImage: `url(${IMAGES.FLIPPBIDD_PRO_BG})` }}>
            <div className="card-content text-start">
            <div className='flex items-center gap-2 justify-between'>
            <div className="icon-wrapper">
                <img src={IMAGES.PERSON_ACHIEVEMENT} alt="Pro Services" className="service-icon" />
              </div>
              
              <div className="service-email">
                <img src={IMAGES.GRADIENT_MAIL} alt="Email" className="email-icon" />
                <a href="mailto:LetsNetwork@flippbidd.com" className='text-xs'>LetsNetwork@flippbidd.com</a>
              </div>
            </div>
              
              <h3 className="service-title text-[#000F1B]">FlippBidd Pro-Services</h3>
              <p className="service-description text-[#2B3842]">
                A premium platform connecting real estate professionals with top-tier investment opportunities, tools, and resources.
              </p>
              
              <a href="#contact" className="contact-button white-button"><span>Contact Us</span></a>
            </div>
          </div>
          
          {/* National Lenders Card */}
          <div className="service-card before:!bg-none before:!content-[''] before:!bg-slate-50 before:opacity-[0.8] lenders-card" style={{ backgroundImage: `url(${IMAGES.NATIONAL_LENDERS_BG})` }}>
            <div className="card-content text-start">
            <div className='flex items-center gap-2 justify-between'>
            <div className="icon-wrapper">
                <img src={IMAGES.NATIONAL_LENDER_ICON} alt="Pro Services" className="service-icon" />
              </div>
              
              <div className="service-email">
                <img src={IMAGES.GRADIENT_MAIL} alt="Email" className="email-icon" />
                <a href="mailto:LetsNetwork@flippbidd.com" className='text-xs'>LetsNetwork@flippbidd.com</a>
              </div>
            </div>
              
              <h3 className="service-title text-[#000F1B]">National Lenders</h3>
              <p className="service-description text-[#2B3842]">
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