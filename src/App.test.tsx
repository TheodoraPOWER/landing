import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
import App from './App';
import { describe, it, expect } from 'vitest';
import { axe } from 'jest-axe'; // Import axe
import './i18n'; // Corrected import path

describe('App component', () => {
  const renderApp = () => render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );

  it('renders the main heading from the HeroSection', () => {
    renderApp();
    // Check for one part of the headline (adjust if text changes)
    // Using a regex to ignore case and handle potential whitespace
    const headingPart = screen.getByText(/Stop Reacting/i); 
    expect(headingPart).toBeInTheDocument();
  });

  // Add accessibility test
  it('should have no axe violations', async () => {
    const { container } = renderApp();
    // Use axe to check the rendered container for accessibility violations
    const results = await axe(container);
    // Assert that there are no violations
    expect(results).toHaveNoViolations();
  });
}); 