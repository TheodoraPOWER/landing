// src/integration/contactFormSubmit.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import i18next from 'i18next';
import App from '../App';
import '../i18n/config'; // Initialize i18n

// Ensure resources are loaded for the test
import enTranslation from '../i18n/locales/en.json';
i18next.addResourceBundle('en', 'translation', enTranslation);

// Mock the global fetch function
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('Contact Form Submission Integration Test', () => {

  beforeEach(async () => {
    // Reset mocks and language before each test
    mockFetch.mockClear();
    await i18next.changeLanguage('en');
    // Default mock successful fetch response
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should allow opening, filling, submitting the contact form, and closing it on success', async () => {
    const user = userEvent.setup();
    render(<App />);

    // --- 1. Open the form --- 
    const letsChatButton = screen.getByRole('button', { name: enTranslation.nav.letsChat });
    await user.click(letsChatButton);

    // Wait for the form to appear (check for the title)
    expect(await screen.findByText(enTranslation.form.title)).toBeVisible();

    // --- 2. Fill the form --- 
    await user.type(screen.getByLabelText(enTranslation.form.name), 'Integration Tester');
    await user.type(screen.getByLabelText(enTranslation.form.email), 'integration@test.com');
    await user.type(screen.getByLabelText(enTranslation.form.company), 'Test Suite Inc.');
    await user.type(screen.getByLabelText(enTranslation.form.role), 'QA');
    await user.type(screen.getByLabelText(enTranslation.form.message), 'This is an integration test message.');

    // --- 3. Submit the form --- 
    const submitButton = screen.getByRole('button', { name: enTranslation.form.submit });
    await user.click(submitButton);

    // --- 4. Verify fetch call --- 
    await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        // Optionally, check the fetch payload if your mock captures it
        expect(mockFetch).toHaveBeenCalledWith(
            expect.any(String), // The form endpoint URL
            expect.objectContaining({
                method: 'POST',
                body: expect.stringContaining('"name":"Integration Tester"')
            })
        );
    });

    // --- 5. Verify success message --- 
    expect(await screen.findByText(enTranslation.form.success)).toBeVisible();

    // --- 6. Verify form closes --- 
    // Wait for the success message AND the form title to disappear
    await waitFor(() => {
        expect(screen.queryByText(enTranslation.form.title)).not.toBeInTheDocument();
        expect(screen.queryByText(enTranslation.form.success)).not.toBeInTheDocument(); // Message should also disappear after timeout
    }, { timeout: 4000 }); // Use timeout similar to the one in ContactForm
  });

  it('should show an error in the form if submission fails', async () => {
    // Override fetch mock for this test to simulate failure
    mockFetch.mockRejectedValueOnce(new Error('API Error'));
    const user = userEvent.setup();
    render(<App />);

    // Open the form
    const letsChatButton = screen.getByRole('button', { name: enTranslation.nav.letsChat });
    await user.click(letsChatButton);
    await screen.findByText(enTranslation.form.title); // Wait for form

    // Fill mandatory fields
    await user.type(screen.getByLabelText(enTranslation.form.name), 'Failure Tester');
    await user.type(screen.getByLabelText(enTranslation.form.email), 'failure@test.com');
    await user.type(screen.getByLabelText(enTranslation.form.message), 'Testing failure case.');

    // Submit
    const submitButton = screen.getByRole('button', { name: enTranslation.form.submit });
    await user.click(submitButton);

    // Verify fetch call
    await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    // Verify error message is shown within the form
    expect(await screen.findByText(enTranslation.form.error)).toBeVisible();

    // Verify form does NOT close automatically on error
    expect(screen.getByText(enTranslation.form.title)).toBeVisible();
    expect(screen.queryByText(enTranslation.form.success)).not.toBeInTheDocument();
  });
}); 