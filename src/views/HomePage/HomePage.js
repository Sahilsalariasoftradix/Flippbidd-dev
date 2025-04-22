import React from "react";
import HeroSection from "../../components/HomePage/HeroSection/HeroSection";
import LeadSection from "../../components/HomePage/LeadSection/LeadSection";
import FeatureSection from "../../components/HomePage/FeatureSection/FeatureSection";
import PolygonSection from "../../components/HomePage/PolygonSection/PolygonSection";
import PropertiesSection from "../../components/HomePage/PropertiesSection/PropertiesSection";
import PricingSection from "../../components/HomePage/PricingSection/PricingSection";
import InvestorIdSection from "../../components/HomePage/InvestorIdSection/InvestorIdSection";
import CommunitySection from "../../components/HomePage/CommunitySection/CommunitySection";
import AffiliateSection from "../../components/HomePage/AffiliateSection/AffiliateSection";
import InvestorServicesSection from "../../components/HomePage/InvestorServicesSection/InvestorServicesSection";
import AppAvailabilitySection from "../../components/HomePage/AppAvailabilitySection/AppAvailabilitySection";
import "./HomePage.css";
import { useLoadScript } from "@react-google-maps/api";

const HomePage = () => {
  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  return (
    <div className="home-page">
      <div className="non-editable">
        <HeroSection isLoaded={isLoaded} loadError={loadError} />
        <LeadSection />
        <FeatureSection />
        <PolygonSection />
        <PropertiesSection isLoaded={isLoaded} loadError={loadError} />
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
