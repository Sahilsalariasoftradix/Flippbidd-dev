import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './VerifiedInvestorModal.css';
import { IMAGES } from '../../../utils/constants';

const VerifiedInvestorModal = ({ isOpen, onClose }) => {
  const [socialMediaLinks, setSocialMediaLinks] = useState([{ platform: '', url: '' }]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    profession: '',
    referralName: '',
    propertyAddress: '',
    transactionDate: '',
    purchasePrice: '',
    soldPrice: '',
    areasOfInterest: '',
    aboutYourself: ''
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
    setSocialMediaLinks([...socialMediaLinks, { platform: '', url: '' }]);
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="verified-investor-modal">
      <div className="modal-header-gradient">
        <div className="image-container">
          <img
            src="/images/png/investor_verified_image.png"
            alt="Verified Investor"
            className="investor-verified-image"
          />
        </div>
      </div>

      <div className="modal-content-wrapper">
        <h2 className="modal-title">
          <span className="title-colored">Verified Investor</span> Request
        </h2>

        <form onSubmit={handleSubmit} className="investor-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                <img src={IMAGES.GRADIENT_USER} alt="Person" className="icon" />
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
                <img src={IMAGES.GRADIENT_MAIL} alt="Person" className="icon" />
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
                <img src="/images/png/building-fill.png" alt="Building" className="icon" />
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
                <img src="/images/png/person-profession-icon.png" alt="Profession" className="icon" />
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
                <img src="/images/png/person-referral-icon.png" alt="Referral Name" className="icon" />
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
          <div className="form-row">
            <div className="form-group social-media-group">
              <label htmlFor="socialMedia">
                <img src="/images/png/social-link-icon.png" alt="Social Media" className="icon" />
              </label>
              <input
                type="text"
                id="socialMedia"
                placeholder="Enter Social Media Links"
                value={socialMediaLinks[0].url}
                onChange={(e) => handleSocialLinkChange(0, 'url', e.target.value)}
              />
              <div className="social-buttons">
                <button type="button" className="save-btn">Save</button>
                <button type="button" className="more-btn" onClick={addSocialLink}>+ More</button>
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="propertyAddress">
                <img src="/images/png/location-icon.png" alt="Property Address" className="icon" />
              </label>
              <input
                type="text"
                id="propertyAddress"
                name="propertyAddress"
                placeholder="Enter Property Address"
                value={formData.propertyAddress}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="transactionDate">
                <img src="/images/png/calendar-2-fill.png" alt="Transaction Date" className="icon" />
              </label>
              <input
                type="text"
                id="transactionDate"
                name="transactionDate"
                placeholder="Enter Transaction Date"
                value={formData.transactionDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="purchasePrice">
                <img src="/images/png/money-dollar-circle-fill.png" alt="Purchase Price" className="icon" />
              </label>
              <input
                type="text"
                id="purchasePrice"
                name="purchasePrice"
                placeholder="Enter Purchase Price"
                value={formData.purchasePrice}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="soldPrice">
                <img src="/images/png/price-tag-3-fill.png" alt="Sold Price" className="icon" />
              </label>
              <input
                type="text"
                id="soldPrice"
                name="soldPrice"
                placeholder="Enter Sold Price"
                value={formData.soldPrice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="areasOfInterest">
                <img src="/images/png/area-icon.png" alt="Areas Of Interest" className="icon" />
              </label>
              <input
                type="text"
                id="areasOfInterest"
                name="areasOfInterest"
                placeholder="Areas of Interest"
                value={formData.areasOfInterest}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="aboutYourself">
                <img src="/images/png/note-write-icon.png" alt="About Yourself" className="icon" />
              </label>
              <textarea
                id="aboutYourself"
                name="aboutYourself"
                placeholder="Tell us a little about yourself."
                value={formData.aboutYourself}
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

export default VerifiedInvestorModal; 