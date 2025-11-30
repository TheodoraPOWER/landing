import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { PillarsSection } from './components/PillarsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { TrustSection } from './components/TrustSection';
import { FinalCTA } from './components/FinalCTA';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiesPolicy from './pages/CookiesPolicy';

const SITE_URL = 'https://theodora.live'; // Updated for custom domain
const OG_IMAGE_URL = `${SITE_URL}/logo-og.png`; // Placeholder - create this image in /public

const PageLayout: React.FC<{ children: React.ReactNode; onLetsChatClick: () => void }> = ({ children, onLetsChatClick }) => (
  <div className="font-sans text-primary">
    <NavBar onLetsChatClick={onLetsChatClick} />
    <main>{children}</main>
    <Footer />
  </div>
);

const LandingPageLayout: React.FC<{ onOpenContactForm: () => void }> = ({ onOpenContactForm }) => {
  const pageTitle = 'Theodora | Real-Time Risk Intelligence & Automated Compliance';
  const pageDescription = 'Theodora provides real-time operational risk intelligence and automated compliance assurance to financial firms and organizations through AI and Observability.';
  const pageUrl = `${SITE_URL}/`;

  return (
  <>
    <Helmet>
      <title>{pageTitle}</title> 
      <meta name="description" content={pageDescription} />
      {/* Open Graph */} 
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={OG_IMAGE_URL} /> 
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={OG_IMAGE_URL} />
      {/* Optional: Add Twitter site handle if you have one */}
      {/* <meta name="twitter:site" content="@tuTwitterHandle" /> */}
    </Helmet>
    <HeroSection onOpenContactForm={onOpenContactForm} />
    <ProblemSection />
    <SolutionSection onOpenContactForm={onOpenContactForm} />
    <PillarsSection onOpenContactForm={onOpenContactForm} />
    <BenefitsSection onOpenContactForm={onOpenContactForm} />
    <CapabilitiesSection onOpenContactForm={onOpenContactForm} />
    <TrustSection onOpenContactForm={onOpenContactForm} />
    <FinalCTA onOpenContactForm={onOpenContactForm} />
  </>
  );
};

function App() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const handleOpenContactForm = () => {
    setIsContactFormOpen(true);
  };

  const handleCloseContactForm = () => {
    setIsContactFormOpen(false);
  };

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route 
          path="/" 
          element={(
            <PageLayout onLetsChatClick={handleOpenContactForm}>
              <LandingPageLayout onOpenContactForm={handleOpenContactForm} />
            </PageLayout>
          )}
        />
        <Route 
          path="/privacy-policy" 
          element={(
            <PageLayout onLetsChatClick={handleOpenContactForm}>
              <Helmet>
                <title>Política de Privacidad - Theodora | Real-Time Risk Intelligence & Automated Compliance</title>
                <meta name="description" content="Consulta nuestra política de privacidad para entender cómo manejamos tus datos en Theodora | Real-Time Risk Intelligence & Automated Compliance." />
                {/* Add minimal OG/Twitter tags for legal pages */}
                <meta property="og:title" content="Política de Privacidad - Theodora | Real-Time Risk Intelligence & Automated Compliance" />
                <meta property="og:url" content={`${SITE_URL}/privacy-policy/`} />
                <meta name="twitter:title" content="Política de Privacidad - Theodora | Real-Time Risk Intelligence & Automated Compliance" />
              </Helmet>
              <PrivacyPolicy />
            </PageLayout>
          )}
        />
        <Route 
          path="/terms-of-service" 
          element={(
            <PageLayout onLetsChatClick={handleOpenContactForm}>
               <Helmet>
                <title>Términos de Servicio - Theodora | Real-Time Risk Intelligence & Automated Compliance</title>
                <meta name="description" content="Lee los términos y condiciones para el uso de los servicios de Theodora | Real-Time Risk Intelligence & Automated Compliance." />
                 {/* Add minimal OG/Twitter tags for legal pages */}
                <meta property="og:title" content="Términos de Servicio - Theodora | Real-Time Risk Intelligence & Automated Compliance" />
                <meta property="og:url" content={`${SITE_URL}/terms-of-service/`} />
                <meta name="twitter:title" content="Términos de Servicio - Theodora | Real-Time Risk Intelligence & Automated Compliance" />
              </Helmet>
              <TermsOfService />
            </PageLayout>
          )}
        />
        <Route 
          path="/cookies-policy" 
          element={(
            <PageLayout onLetsChatClick={handleOpenContactForm}>
              <Helmet>
                <title>Política de Cookies - Theodora | Real-Time Risk Intelligence & Automated Compliance</title>
                <meta name="description" content="Información sobre el uso de cookies en el sitio web de Theodora | Real-Time Risk Intelligence & Automated Compliance." />
                 {/* Add minimal OG/Twitter tags for legal pages */}
                <meta property="og:title" content="Política de Cookies - Theodora | Real-Time Risk Intelligence & Automated Compliance" />
                <meta property="og:url" content={`${SITE_URL}/cookies-policy/`} />
                <meta name="twitter:title" content="Política de Cookies - Theodora | Real-Time Risk Intelligence & Automated Compliance" />
              </Helmet>
              <CookiesPolicy />
            </PageLayout>
          )}
        />
      </Routes>
      {isContactFormOpen && <ContactForm onClose={handleCloseContactForm} />}
    </BrowserRouter>
  );
}

export default App;