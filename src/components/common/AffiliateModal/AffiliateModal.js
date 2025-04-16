import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './AffiliateModal.css';
import { IMAGES } from '../../../utils/constants';
const AffiliateModal = ({ isOpen, onClose }) => {
  const [socialMediaLinks, setSocialMediaLinks] = useState([{ platform: 'twitter', url: '' }]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    profession: '',
    referralName: '',
    followersCount: '',
    note: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...socialMediaLinks];
    updatedLinks[index][field] = value;
    setSocialMediaLinks(updatedLinks);
  };

  const addSocialLink = () => {
    setSocialMediaLinks([...socialMediaLinks, { platform: 'instagram', url: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ ...formData, socialMediaLinks });
    // Close modal after submission
    onClose();
  };

  // Profession options for the dropdown
  const professionOptions = [
    'Real Estate Agent',
    'Real Estate Broker',
    'Real Estate Investor',
    'Developer',
    'Property Manager',
    'Wholesaler',
    'Lender',
    'Other'
  ];
  
  // Followers count options
  const followersOptions = [
    '0-500',
    '500-1000',
    '1000 - 5000',
    '5000-10000',
    '10000+'
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="affiliate-modal">
        <img src={IMAGES.AFFILIATE_BG} alt="Affiliate Background" style={{ width: 'auto', maxWidth: '100%' }} />
      <div className="modal-content-wrapper">
        <h2 className="modal-title">
          Become a <span className="title-colored">FlippBidd</span> Affiliate
        </h2>
        
        <form onSubmit={handleSubmit} className="affiliate-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
              <img src={IMAGES.GRADIENT_USER} alt="user" style={{width: '20px', height: '20px'}} /> 
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
              <img src={IMAGES.GRADIENT_MAIL} alt="user" style={{width: '20px', height: '20px'}} /> 
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">
                <i className="icon phone-icon"></i>
              </label>
              <PhoneInput
                country={'us'}
                value={formData.phone}
                onChange={handlePhoneChange}
                inputProps={{
                  name: 'phone',
                  required: true,
                  placeholder: 'Phone'
                }}
                containerClass="phone-container"
                inputClass="phone-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="companyName">
              <img src={IMAGES.GRADIENT_BUILDING} alt="user" style={{width: '20px', height: '20px'}} /> 
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="profession">
                <img src={IMAGES.PROFESSION_ICON} alt="profession" style={{width: '20px', height: '20px'}} />
              </label>
              <select
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                required
              >
                <option value="">Select Profession</option>
                {professionOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="referralName">
                <img src={IMAGES.REFER_USER_ICON} alt="referral" style={{width: '20px', height: '20px'}} />
              </label>
              <input
                type="text"
                id="referralName"
                name="referralName"
                placeholder="Enter Referral Name"
                value={formData.referralName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Social Media Links */}
          {socialMediaLinks.map((link, index) => (
            <div className="form-row" key={index}>
              <div className="form-group social-media-group">
                <label htmlFor={`socialMedia-${index}`}>
                <img src={IMAGES.GRADIENT_LINK_ICON} alt="user" style={{width: '20px', height: '20px'}} /> 
                </label>
                <input
                  type="text"
                  id={`socialMedia-${index}`}
                  placeholder={link.platform === 'twitter' ? 'twitter.com/@username' : 'instagram.com/@username'}
                  value={link.url}
                  onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                />
                {index === 0 && (
                  <div className="social-buttons">
                    <button type="button" className="save-btn">Save</button>
                    <button type="button" className="more-btn" onClick={addSocialLink}>+ More</button>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="followersCount">
                <img src={IMAGES.FOLLOWERS_ICON} alt="followers" style={{width: '20px', height: '20px'}} />
              </label>
              <select
                id="followersCount"
                name="followersCount"
                value={formData.followersCount}
                onChange={handleChange}
              >
                <option value="">Enter no. of Followers</option>
                {followersOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="note">
                <img src={IMAGES.WRITE_NOTE_ICON} alt="note" style={{width: '20px', height: '20px'}} />
              </label>
              <textarea
                id="note"
                name="note"
                placeholder="Write Note"
                value={formData.note}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="form-submit">
            <button type="submit" className="submit-button">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AffiliateModal; 