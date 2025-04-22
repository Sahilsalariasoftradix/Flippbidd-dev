import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../../../utils/constants';
import './PricingSection.css';

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const sectionRef = useRef(null);
  
  // Helper function to get absolute URL for images
  const getImageUrl = (path) => {
    return `${window.location.origin}${path}`;
  };

  // Handle clicks outside the pricing cards
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click wasn't on a pricing card, unselect
      if (sectionRef.current && 
          !event.target.closest('.pricing-card') && 
          sectionRef.current.contains(event.target)) {
        setSelectedPlan(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Define the plans data with features
  const plans = [
    {
      id: 1,
      price: '$129.00',
      title: 'Pro-License',
      featured: false,
      trial: false,
      features: [
        'Mobile Device Access',
        '100 SkipTraces/Month'
      ],
      link: '/subscribe?plan=pro'
    },
    {
      id: 2,
      price: '$199.00',
      title: 'WebApp Package',
      featured: true,
      trial: true,
      features: [
        'WebApp + Mobile Device Access',
        '100 Property Reports',
        'FlippBidd Leads',
        'National Investor Search',
        '100 SkipTraces/Month'
      ],
      link: '/subscribe?plan=web'
    },
    {
      id: 3,
      price: '$299.00',
      title: 'Pro-Plus+ Coming Soon',
      featured: false,
      trial: false,
      features: [
        'WebApp Package ',
        'Virtual Tours w/ RSVP Reminders',
        '500 Property Reports',
        '200 SkipTraces/Month'
      ],
      link: '/subscribe?plan=pro-plus'
    }
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  return (
    <section className="pricing-section" ref={sectionRef}>
      <div className="container" >
        
        <h2 className="section-title">
          <span className="highlight">FlippBidd</span>{' '}
          <span className="normal-text">Pricing & Plans</span>
        </h2>
        
        <div className="pricing-grid">
          {plans.map(plan => (
            <div 
              key={plan.id} 
              className={`pricing-card ${plan.featured ? 'featured' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent the click from bubbling to section
                handlePlanSelect(plan.id);
              }}
            >
              <div className="price-header">
                {plan.trial && <div className="trial-badge">GET A 7-DAY TRIAL</div>}
                <h3 className="price-amount bg-gradient-to-r from-[#003F79] via-[#0160b8] to-[#00ACDB] inline-block text-transparent bg-clip-text">{plan.price}<span className="!text-sm">/Month</span></h3>
                <h4 className="price-title">{plan.title}</h4>
              </div>
              
              <div className="price-features">
                {plan.features.map((feature, index) => (
                  <div key={index} className="price-feature">
                    <img src={getImageUrl(IMAGES.MULTI_GRADIENT_CHECKBOX)} alt="Check" className="feature-check" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="price-action">
                <a target="_blank" rel="noopener noreferrer" href={`${process.env.REACT_APP_WEBAPP_URL}/subscribe?plan=${plan.link}`} className="subscribe-btn">Subscribe</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 