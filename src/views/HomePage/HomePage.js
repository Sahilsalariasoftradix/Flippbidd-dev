import React from 'react';
import HeroSection from '../../components/HomePage/HeroSection/HeroSection';
import LeadSection from '../../components/HomePage/LeadSection/LeadSection';
import FeatureSection from '../../components/HomePage/FeatureSection/FeatureSection';
import PolygonSection from '../../components/HomePage/PolygonSection/PolygonSection';
import PropertiesSection from '../../components/HomePage/PropertiesSection/PropertiesSection';
import PricingSection from '../../components/HomePage/PricingSection/PricingSection';
import InvestorIdSection from '../../components/HomePage/InvestorIdSection/InvestorIdSection';
import CommunitySection from '../../components/HomePage/CommunitySection/CommunitySection';
import AffiliateSection from '../../components/HomePage/AffiliateSection/AffiliateSection';
import InvestorServicesSection from '../../components/HomePage/InvestorServicesSection/InvestorServicesSection';
import AppAvailabilitySection from '../../components/HomePage/AppAvailabilitySection/AppAvailabilitySection';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="non-editable">
      <HeroSection />
      <LeadSection />
      <FeatureSection />
      <PolygonSection />
      <PropertiesSection />
      <PricingSection />
      <InvestorIdSection />
      <CommunitySection />
      <AffiliateSection />
      <InvestorServicesSection />
      <AppAvailabilitySection />
    </div>
    </div>
  );
};

export default HomePage; 