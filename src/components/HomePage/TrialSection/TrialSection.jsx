import React from 'react';
import { useTrialController } from '../../../controllers/TrialController';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './TrialSection.css';

const TrialSection = () => {
  const {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    professionOptions,
    handleInputChange,
    handlePhoneChange,
    handleSubmit,
  } = useTrialController();

  return (
    <div className="trial-section-container">
      <div className="trial-section-content">
        {/* Left side with gradient background */}
        <div className="trial-left-section">
          <div className="trial-left-content">
            <h3 className="trial-small-heading">ENJOY A 7 DAY</h3>
            <h1 className="trial-large-heading">FREE TRIAL</h1>
            <p className="trial-description">
              FlippBidd is a Real Estate Investment Application where
              Investors, Wholesalers, Brokers, Acquisition and Disposition
              specialists can Locate, Showcase and Discuss their
              Investment Deals DIRECT!
            </p>
          </div>
          {/* Background watermark */}
          <div className="trial-background-graphic"></div>
        </div>

        {/* Right side with form */}
        <div className="trial-right-section">
          {submitSuccess ? (
            <div className="trial-success-message">
              <h2>Thank you for your request!</h2>
              <p>We'll be in touch shortly to get your trial set up.</p>
            </div>
          ) : (
            <div className="trial-form-wrapper">
              <h2 className="trial-form-heading">Request Trial</h2>
              <form onSubmit={handleSubmit} className="trial-form">
                {/* Full Name Input */}
                <div className="trial-form-group">
                  <div className="input-with-icon">
                    <span className="input-icon">
                      <i className="fas fa-user"></i>
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={errors.fullName ? 'error-input' : ''}
                    />
                  </div>
                  {errors.fullName && <p className="error-text">{errors.fullName}</p>}
                </div>

                {/* Company Name Input */}
                <div className="trial-form-group">
                  <div className="input-with-icon">
                    <span className="input-icon">
                      <i className="fas fa-building"></i>
                    </span>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={errors.companyName ? 'error-input' : ''}
                    />
                  </div>
                  {errors.companyName && <p className="error-text">{errors.companyName}</p>}
                </div>

                {/* Email Input */}
                <div className="trial-form-group">
                  <div className="input-with-icon">
                    <span className="input-icon">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error-input' : ''}
                    />
                  </div>
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                {/* Phone Input */}
                <div className="trial-form-group">
                  <div className="input-with-icon phone-input-container">
                    <PhoneInput
                      country="us"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      inputClass={errors.phone ? 'phone-input error-input' : 'phone-input'}
                      containerClass="phone-container"
                      placeholder="Phone"
                    />
                  </div>
                  {errors.phone && <p className="error-text">{errors.phone}</p>}
                </div>

                {/* Profession Select */}
                <div className="trial-form-group">
                  <div className="input-with-icon">
                    <span className="input-icon">
                      <i className="fas fa-briefcase"></i>
                    </span>
                    <select
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      className={errors.profession ? 'error-input' : ''}
                    >
                      <option value="" disabled selected>
                        Select Profession
                      </option>
                      {professionOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.profession && <p className="error-text">{errors.profession}</p>}
                </div>

                {/* Referral Section */}
                <div className="trial-form-group referral-section">
                  <div className="referral-row">
                    <div className="referral-input">
                      <div className="input-with-icon">
                        <span className="input-icon">
                          <i className="fas fa-user-friends"></i>
                        </span>
                        <input
                          type="text"
                          name="referralSource"
                          placeholder="Referral Source"
                          value={formData.referralSource}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="referral-divider">OR</div>
                    <div className="referral-input">
                      <div className="input-with-icon">
                        <span className="input-icon">
                          <i className="fas fa-tag"></i>
                        </span>
                        <input
                          type="text"
                          name="referralCode"
                          placeholder="Code"
                          value={formData.referralCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {errors.submit && <p className="error-text submit-error">{errors.submit}</p>}

                <button
                  type="submit"
                  className="trial-submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Send Request"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrialSection; 