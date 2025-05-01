import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import * as Sentry from "@sentry/react"; // Import Sentry
import App from './App.tsx';
import './i18n';
import './index.css';

// --- Sentry Initialization ---
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      // Default integrations
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        // Additional Replay configuration options can be specified here
        // maskAllText: false, // Example: Set to false to potentially capture more text
        // blockAllMedia: true, // Example: Set to true to block media elements
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of transactions for performance monitoring. Adjust in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // Capture 10% of sessions for replay. Adjust in production!
    replaysOnErrorSampleRate: 1.0, // Capture 100% of sessions with errors for replay.
    
    // Set environment based on Vite mode
    environment: import.meta.env.MODE,
    // You might want to set release version dynamically during build/deploy
    // release: "my-project-name@" + process.env.npm_package_version,
  });
  console.log("Sentry initialized.");
} else {
  console.warn("Sentry DSN not found. Sentry will not be initialized.");
}
// --- End Sentry Initialization ---

// Helper function to render the app
const renderApp = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  );
};

// Conditionally import and run axe-core/react for development
// Make sure Sentry is initialized *before* rendering
if (import.meta.env.MODE !== 'production') { 
  // Using dynamic import to avoid including axe-core in production bundle
  import('@axe-core/react').then(axe => {
    axe.default(React, import('react-dom'), 1000); // Run checks 1 second after changes
    
    renderApp(); // Render after axe is initialized
  }).catch(err => {
    console.error("Failed to load axe-core/react", err);
    // Fallback to render the app even if axe fails to load
    renderApp(); // Fallback rendering
  });
} else {
  // Production rendering (without axe)
  renderApp();
}