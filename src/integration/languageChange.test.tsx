// src/integration/languageChange.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import i18next from 'i18next'; 
import App from '../App';
import '../i18n/config'; // Initialize i18n 

// Ensure resources are loaded for the test - might need adjustment based on your config
import esTranslation from '../i18n/locales/es.json';
import enTranslation from '../i18n/locales/en.json';

i18next.addResourceBundle('en', 'translation', enTranslation);
i18next.addResourceBundle('es', 'translation', esTranslation);

describe('Language Change Integration Test', () => {

  beforeEach(async () => {
    // Reset to English before each test
    await i18next.changeLanguage('en');
    // Clear any previous renders if necessary (Testing Library usually handles this)
  });

  it('should change the language of the UI when a new language is selected', async () => {
    const user = userEvent.setup();
    render(<App />); 

    // 1. Verify initial state (English)
    // Check text in NavBar for example
    expect(screen.getByRole('button', { name: enTranslation.nav.letsChat })).toBeInTheDocument();
    // Check text in HeroSection
    expect(screen.getByText(enTranslation.hero.headline1, { exact: false })).toBeInTheDocument();

    // 2. Find and click the language selector button
    // The button initially shows the current language code (EN)
    const languageButton = screen.getByRole('button', { name: /language selector/i });
    expect(screen.getByText('EN')).toBeInTheDocument(); // Verify initial state
    await user.click(languageButton);

    // 3. Find and click the Spanish option in the dropdown
    // Use the full language name as defined in the resources
    const spanishOption = await screen.findByText(enTranslation.language.es); // 'Español'
    await user.click(spanishOption);

    // 4. Wait for the language change and verify UI updates
    await waitFor(() => {
        // Check that the button text updated
        expect(screen.getByText('ES')).toBeInTheDocument();
        // Verify text changed in NavBar
        expect(screen.getByRole('button', { name: esTranslation.nav.letsChat })).toBeInTheDocument();
         // Verify text changed in HeroSection
        expect(screen.getByText(esTranslation.hero.headline1, { exact: false })).toBeInTheDocument();
        // Verify the English text is gone
        expect(screen.queryByRole('button', { name: enTranslation.nav.letsChat })).not.toBeInTheDocument();
        expect(screen.queryByText(enTranslation.hero.headline1, { exact: false })).not.toBeInTheDocument();
    });

    // Optional: Verify i18next language state changed
    expect(i18next.language).toBe('es');
  });
}); 