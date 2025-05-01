// src/components/LanguageSelector.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';

// Basic i18n initialization for tests
const resources = {
  en: {
    translation: {
      language: { en: 'English', es: 'Español', it: 'Italiano', pt: 'Português' },
    },
  },
  es: {
    translation: {
      language: { en: 'English', es: 'Español', it: 'Italiano', pt: 'Português' },
    },
  },
  // Add other languages if needed for specific tests, but keep it minimal
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language for tests
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

// Mock the changeLanguage function
const mockChangeLanguage = vi.fn();
i18next.changeLanguage = mockChangeLanguage;

// Helper to render the component wrapped in I18nextProvider
const renderLanguageSelector = (props = {}) => {
  return render(
    <I18nextProvider i18n={i18next}>
      <LanguageSelector {...props} />
    </I18nextProvider>
  );
};

describe('LanguageSelector component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockChangeLanguage.mockClear();
    // Reset language to English before each test
    i18next.language = 'en'; 
  });

  it('should render the current language button', () => {
    renderLanguageSelector();
    // Check for the button, maybe by its initial text or an accessible role/name
    // Using a regex for flexibility
    expect(screen.getByRole('button', { name: /language selector/i })).toBeInTheDocument();
    // Check for initial language indicator (e.g., 'EN')
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('should open the language menu when the button is clicked', async () => {
    renderLanguageSelector();
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Wait for the menu items to appear (use text from resources)
    await waitFor(() => {
      expect(screen.getByText('Español')).toBeVisible();
      expect(screen.getByText('Italiano')).toBeVisible();
      expect(screen.getByText('Português')).toBeVisible();
      // English might not be shown as selectable if it's the current language
      // Adjust assertion based on actual component behavior
    });
  });

  it('should call changeLanguage with the correct code when a language is selected', async () => {
    renderLanguageSelector();
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Wait for menu and click Spanish
    const spanishOption = await screen.findByText('Español');
    fireEvent.click(spanishOption);

    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
    expect(mockChangeLanguage).toHaveBeenCalledWith('es');
  });

  it('should close the menu after selecting a language', async () => {
    renderLanguageSelector();
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Wait for menu and click Spanish
    const spanishOption = await screen.findByText('Español');
    fireEvent.click(spanishOption);

    // Check that menu items are no longer visible
    await waitFor(() => {
       expect(screen.queryByText('Italiano')).not.toBeInTheDocument();
       expect(screen.queryByText('Português')).not.toBeInTheDocument();
    });
  });

}); 