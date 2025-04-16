import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES, ROUTES } from '../../../utils/constants';
import './Footer.css';

const Footer = () => {
  // Use inline style for the background image
  const footerBackgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}${IMAGES.FOOTER_BG})`,
    backgroundPosition: 'bottom right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    opacity: 0.5,
    zIndex: 0,
    pointerEvents: 'none'
  };

  return (
    <footer className="footer">
      <div className="non-editable">
      <div className="footer-background" style={footerBackgroundStyle}></div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo-section">
            <div className="logo">
              <Link to={ROUTES.HOME}>
                <img src={`${process.env.PUBLIC_URL}${IMAGES.LOGO}`} alt="FlippBidd Logo" className="logo-img" />
              </Link>
            </div>
            <p className="footer-description">
              FlippBidd is the ultimate real estate investment platform, providing nationwide off-market leads, financial services, and data-driven insights to empower investors.
            </p>
            <div className="social-icons">
              <button className="social-icon" aria-label="Facebook" style={{ backgroundColor: '#00ACDB', color: 'white' }}>
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="social-icon" aria-label="LinkedIn" style={{ backgroundColor: '#00ACDB', color: 'white' }}>
                <i className="fab fa-linkedin-in"></i>
              </button>
              <button className="social-icon" aria-label="Instagram" style={{ backgroundColor: '#00ACDB', color: 'white' }}>
                <i className="fab fa-instagram"></i>
              </button>
              <button className="social-icon" aria-label="YouTube" style={{ backgroundColor: '#00ACDB', color: 'white' }}>
                <i className="fab fa-youtube"></i>
              </button>
              <button className="social-icon" aria-label="TikTok" style={{ backgroundColor: '#00ACDB', color: 'white' }}>
                <i className="fab fa-tiktok"></i>
              </button>
            </div>
          </div>

          <div className="footer-links-section">
            <div className="quick-links">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to={ROUTES.HOME}>Home</Link></li>
                <li><Link to={ROUTES.SEVEN_DAY_TRIAL}>7 Day Trial</Link></li>
                <li><Link to="#">Book a Demo</Link></li>
                <li><Link to="#">Submit Property</Link></li>
              </ul>
            </div>

            <div className="contact-info">
              <h3>Get in Touch</h3>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <p>New York, NY</p>
              </div>
              <div className="contact-item">
                <i className="far fa-calendar-alt"></i>
                <p>
                  <a href="https://calendly.com/flippbidd/flippbidd-network-intro-demo" target="_blank" rel="noopener noreferrer">
                    https://calendly.com/flippbidd/flippbidd-network-intro-demo
                  </a>
                </p>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone-alt"></i>
                <p>+1 376-688-3295</p>
              </div>
            </div>

            <div className="newsletter">
              <h3>Get our Weekly Email Updates</h3>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter Your Email" />
                <button type="submit">Send</button>
              </div>
              <div className="app-downloads">
                <button className="app-download-button" aria-label="Download on App Store">
                  <img src={`${process.env.PUBLIC_URL}${IMAGES.APPLE_STORE}`} alt="Download on App Store" />
                </button>
                <button className="app-download-button" aria-label="Get it on Google Play">
                  <img src={`${process.env.PUBLIC_URL}${IMAGES.GOOGLE_PLAY}`} alt="Get it on Google Play" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>© Copyright 2025 FlippBidd App</p>
            <div className="footer-bottom-links">
              <Link to="#">Terms & Conditions</Link>
              <Link to="#">Privacy policy</Link>
            </div>
          </div>
          <div className="footer-bottom-right">
            <Link to="#">Contact Sales</Link>
            <Link to="#">Contact Support</Link>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer; 