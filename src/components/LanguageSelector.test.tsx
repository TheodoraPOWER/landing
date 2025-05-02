// src/components/LanguageSelector.test.tsx
import { render, screen } from '@testing-library/react'; // Removed waitFor
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
// import i18next from 'i18next'; // Don't import i18next directly if relying on global config
// import { I18nextProvider, initReactI18next } from 'react-i18next'; // Provider likely not needed if config is global
import { LanguageSelector } from './LanguageSelector';
import i18n from 'i18next'; // Import the global instance to spy on
import '../i18n'; // Corrected import path

// Spy on the globally configured i18next instance
const mockChangeLanguage = vi.fn(async (lang: string) => {
  // Simulate the actual language change side-effect for the test
  i18n.language = lang;
  // Return a promise like the real implementation might
  return Promise.resolve(); 
});
vi.spyOn(i18n, 'changeLanguage').mockImplementation(mockChangeLanguage);

// REMOVED local resources and init - rely on global config from import '../i18n/config.ts'

// Helper to render the component - No need for I18nextProvider if relying on global config
const renderLanguageSelector = () => {
  return render(<LanguageSelector />);
};

describe('LanguageSelector component (as <select>)', () => {

  beforeEach(async () => {
    mockChangeLanguage.mockClear();
    // Reset language AND ensure the spy reflects the initial state if needed
    // Note: Calling changeLanguage here WILL trigger the spy
    await i18n.changeLanguage('en'); 
    mockChangeLanguage.mockClear(); // Clear again after initial setup call
  });

  it('should render the select element with the current language selected', () => {
    renderLanguageSelector();
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('en'); 
  });

  it('should display available language options based on global config', () => {
    renderLanguageSelector();
    // Rely on text provided by global i18n config
    // These might need adjustment depending on your actual translations
    expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument(); 
    expect(screen.getByRole('option', { name: 'Español' })).toBeInTheDocument();
  });

  it('should call changeLanguage with the correct code AND update i18n state', async () => {
    const user = userEvent.setup();
    renderLanguageSelector();
    const selectElement = screen.getByRole('combobox');

    expect(selectElement).toHaveValue('en');

    await user.selectOptions(selectElement, 'es');

    expect(mockChangeLanguage).toHaveBeenCalledWith('es');
    
    // INSTEAD: Verify the i18next state was actually changed by the mock
    expect(i18n.language).toBe('es');
  });

}); 