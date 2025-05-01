// src/components/NavBar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom'; // Needed if NavBar uses Link or routing context
import { NavBar } from './NavBar';
import '../i18n/config'; // Initialize i18n for tests

// Mock the LanguageSelector component to avoid its complexity in NavBar tests
vi.mock('./LanguageSelector', () => ({
  LanguageSelector: () => <div data-testid="language-selector-mock">LanguageSelector</div>,
}));

describe('NavBar component', () => {
  const mockOnLetsChatClick = vi.fn();

  const renderNavBar = () => {
    render(
      <BrowserRouter> 
        <NavBar onLetsChatClick={mockOnLetsChatClick} />
      </BrowserRouter>
    );
  };

  it('should render the logo, navigation links, chat button, and language selector', () => {
    renderNavBar();

    // Check for logo
    expect(screen.getByAltText('Theodora Logo')).toBeInTheDocument();

    // Check for navigation links (using i18n keys)
    expect(screen.getByText('nav.problem')).toBeInTheDocument(); 
    expect(screen.getByText('nav.solution')).toBeInTheDocument();
    expect(screen.getByText('nav.howItWorks')).toBeInTheDocument();
    expect(screen.getByText('nav.benefits')).toBeInTheDocument();

    // Check for "Let's Chat" button (using i18n key)
    expect(screen.getByText('nav.letsChat')).toBeInTheDocument();

    // Check if the mocked LanguageSelector is rendered
    expect(screen.getByTestId('language-selector-mock')).toBeInTheDocument();
  });

  it('should call onLetsChatClick when the chat button is clicked', () => {
    renderNavBar();

    const letsChatButton = screen.getByText('nav.letsChat');
    fireEvent.click(letsChatButton);

    expect(mockOnLetsChatClick).toHaveBeenCalledTimes(1);
  });

  // TODO: Add tests for mobile menu toggle and functionality
  // TODO: Add tests for scroll behavior styling changes (optional, harder to test)
}); 