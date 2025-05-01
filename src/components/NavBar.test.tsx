// src/components/NavBar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom'; // Needed if NavBar uses Link or routing context
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { NavBar } from './NavBar';
import '../i18n'; // Corrected import path

// Mock the LanguageSelector component to avoid its complexity in NavBar tests
vi.mock('./LanguageSelector', () => ({
  LanguageSelector: () => <div data-testid="language-selector-mock">LanguageSelector</div>,
}));

// Helper component to provide translation context
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  // Pass t or necessary translations if needed, or just wrap
  return <>{children}</>; 
};

describe('NavBar component', () => {
  const mockOnLetsChatClick = vi.fn();

  // Define expected translated text
  const expectedTexts = {
    problem: 'Problem',
    solution: 'Solution', 
    howItWorks: 'How It Works',
    benefits: 'Benefits',
    letsChat: "Let's Chat",
  };

  const renderNavBar = () => {
    render(
      <BrowserRouter> 
        <TestWrapper>
          <NavBar onLetsChatClick={mockOnLetsChatClick} />
        </TestWrapper>
      </BrowserRouter>
    );
  };

  it('should render the logo, navigation links, chat button, and language selector', () => {
    renderNavBar();

    // Check for logo
    expect(screen.getByAltText('Theodora Logo')).toBeInTheDocument();

    // Check for navigation links (using i18n keys)
    expect(screen.getByText(expectedTexts.problem)).toBeInTheDocument(); 
    expect(screen.getByText(expectedTexts.solution)).toBeInTheDocument();
    expect(screen.getByText(expectedTexts.howItWorks)).toBeInTheDocument();
    expect(screen.getByText(expectedTexts.benefits)).toBeInTheDocument();

    // Check for "Let's Chat" button (using i18n key)
    expect(screen.getByText(expectedTexts.letsChat)).toBeInTheDocument();

    // Check if *at least one* mocked LanguageSelector is rendered (or check length)
    const selectors = screen.getAllByTestId('language-selector-mock');
    expect(selectors.length).toBeGreaterThanOrEqual(1);
    // expect(selectors).toHaveLength(2); // Be more specific if needed
  });

  it('should call onLetsChatClick when the chat button is clicked', () => {
    renderNavBar();

    const letsChatButton = screen.getByText(expectedTexts.letsChat);
    fireEvent.click(letsChatButton);

    expect(mockOnLetsChatClick).toHaveBeenCalledTimes(1);
  });

  // TODO: Add tests for mobile menu toggle and functionality
  // TODO: Add tests for scroll behavior styling changes (optional, harder to test)
}); 