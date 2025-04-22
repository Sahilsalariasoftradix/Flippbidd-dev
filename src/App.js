import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './views/HomePage/HomePage';
import PropertySearch from './views/PropertySearch/PropertySearch';
import SevenDayTrial from './views/SevenDayTrial/SevenDayTrial';
import SubmitProperty from './views/SubmitProperty/SubmitProperty';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import TermsOfUse from './views/TermsOfUse/TermsOfUse';
import BillingTerms from './views/BillingTerms/BillingTerms';
import PrivacyPolicy from './views/PrivacyPolicy/PrivacyPolicy';

function App() {
  return (
    <Router>
      <div className="App">
      <Toaster />
        <Header />
        <Routes>  
          <Route path="/" element={<HomePage />} />
          <Route path="/property-search" element={<PropertySearch />} />
          <Route path="/seven-day-trial" element={<SevenDayTrial />} />
          <Route path="/submit-property" element={<SubmitProperty />} />
          <Route path="/termsofuse" element={<TermsOfUse />} />
          <Route path="/billing-terms" element={<BillingTerms />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
