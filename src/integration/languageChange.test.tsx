// src/integration/languageChange.test.tsx
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import i18next from 'i18next'; 
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';
import '../i18n'; // Corrected import path

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
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    ); 

    // 1. Verify initial state (English) - Use translated values
    const nav = screen.getByRole('navigation');
    expect(within(nav).getByRole('button', { name: enTranslation.nav.letsChat })).toBeInTheDocument(); // Use value
    expect(screen.getByText(enTranslation.hero.headline1, { exact: false })).toBeInTheDocument(); // Use value

    // 2. Find language selector
    const languageSelectors = within(nav).getAllByRole('combobox'); 
    const languageSelector = languageSelectors[0]; 
    expect(languageSelector).toHaveValue('en');

    // 3. Change language 
    await user.selectOptions(languageSelector, 'es');

    // 4. Wait and verify UI updates - Use translated values
    await waitFor(() => {
        expect(languageSelector).toHaveValue('es');
        expect(within(nav).getByRole('button', { name: esTranslation.nav.letsChat })).toBeInTheDocument(); // Use Spanish value
        expect(screen.getByText(esTranslation.hero.headline1, { exact: false })).toBeInTheDocument(); // Use Spanish value
        // Verify the English text is gone by value
        expect(within(nav).queryByRole('button', { name: enTranslation.nav.letsChat })).not.toBeInTheDocument();
        expect(screen.queryByText(enTranslation.hero.headline1, { exact: false })).not.toBeInTheDocument();
    });

    expect(i18next.language).toBe('es');
  });
}); 