import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';
import { axe } from 'jest-axe'; // Import axe
import './i18n/config'; // Ensure i18n is initialized

describe('App component', () => {
  it('renders the main heading from the HeroSection', () => {
    render(<App />);
    // Check for one part of the headline (adjust if text changes)
    // Using a regex to ignore case and handle potential whitespace
    const headingPart = screen.getByText(/Stop Reacting/i); 
    expect(headingPart).toBeInTheDocument();
  });

  // Add accessibility test
  it('should have no axe violations', async () => {
    const { container } = render(<App />);
    // Use axe to check the rendered container for accessibility violations
    const results = await axe(container);
    // Assert that there are no violations
    expect(results).toHaveNoViolations();
  });
}); 