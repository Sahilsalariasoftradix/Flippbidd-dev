import { useState } from 'react';

/**
 * Controller for handling 7-day trial form submission
 * @returns {Object} Form handling methods and state
 */
export const useTrialController = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    profession: '',
    referralSource: '',
    referralCode: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const professionOptions = [
    'Real Estate Agent',
    'Broker',
    'Investor',
    'Property Manager',
    'HomeOwner',
    'Property Inspector',
    'Contractor',
    'Lender',
    'Other',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });
    // Clear error when user starts typing
    if (errors.phone) {
      setErrors({
        ...errors,
        phone: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    // Validate Company Name
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Validate Phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Validate Profession
    if (!formData.profession) {
      newErrors.profession = 'Please select a profession';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // For now, just simulate API call with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Form submitted successfully:', formData);
        setSubmitSuccess(true);
        
        // Reset form after successful submission
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          phone: '',
          profession: '',
          referralSource: '',
          referralCode: '',
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({
          ...errors,
          submit: 'Failed to submit form. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log('Form validation failed');
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    professionOptions,
    handleInputChange,
    handlePhoneChange,
    handleSubmit
  };
};

export default useTrialController; 