import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { PillarsSection } from './components/PillarsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { TrustSection } from './components/TrustSection';
import { FinalCTA } from './components/FinalCTA';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiesPolicy from './pages/CookiesPolicy';

const SITE_URL = 'https://TheodoraPOWER.github.io/landing'; // Define base URL once
const OG_IMAGE_URL = `${SITE_URL}/logo-og.png`; // Placeholder - create this image in /public

const PageLayout: React.FC<{ children: React.ReactNode; onLetsChatClick: () => void }> = ({ children, onLetsChatClick }) => (
  <div className="font-sans text-primary">
    <NavBar onLetsChatClick={onLetsChatClick} />
    <main>{children}</main>
    <Footer />
  </div>
);

const LandingPageLayout: React.FC<{ onOpenContactForm: () => void }> = ({ onOpenContactForm }) => {
  const pageTitle = 'Project Bolt - Tu Solución Innovadora';
  const pageDescription = 'Descubre cómo Project Bolt puede transformar tu negocio con nuestra solución innovadora y personalizada.';
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
    <BrowserRouter basename="/landing/">
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
                <title>Política de Privacidad - Project Bolt</title>
                <meta name="description" content="Consulta nuestra política de privacidad para entender cómo manejamos tus datos en Project Bolt." />
                {/* Add minimal OG/Twitter tags for legal pages */}
                <meta property="og:title" content="Política de Privacidad - Project Bolt" />
                <meta property="og:url" content={`${SITE_URL}/privacy-policy/`} />
                <meta name="twitter:title" content="Política de Privacidad - Project Bolt" />
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
                <title>Términos de Servicio - Project Bolt</title>
                <meta name="description" content="Lee los términos y condiciones para el uso de los servicios de Project Bolt." />
                 {/* Add minimal OG/Twitter tags for legal pages */}
                <meta property="og:title" content="Términos de Servicio - Project Bolt" />
                <meta property="og:url" content={`${SITE_URL}/terms-of-service/`} />
                <meta name="twitter:title" content="Términos de Servicio - Project Bolt" />
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
                <title>Política de Cookies - Project Bolt</title>
                <meta name="description" content="Información sobre el uso de cookies en el sitio web de Project Bolt." />
                 {/* Add minimal OG/Twitter tags for legal pages */}
                <meta property="og:title" content="Política de Cookies - Project Bolt" />
                <meta property="og:url" content={`${SITE_URL}/cookies-policy/`} />
                <meta name="twitter:title" content="Política de Cookies - Project Bolt" />
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