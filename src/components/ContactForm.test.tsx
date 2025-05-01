import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event' // Use userEvent for more realistic interactions
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ContactForm } from './ContactForm';

// Basic i18n initialization for tests
const resources = {
  en: {
    translation: {
      form: {
        title: "Let's discuss your needs",
        name: "Full Name",
        email: "Email",
        company: "Company",
        role: "Role",
        message: "Message",
        submit: "Send Message",
        success: "Thank you! We'll be in touch soon.",
        error: "There was an error. Please try again.",
        required: "Required field"
      }
    },
  },
  // Add other languages if needed
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'en', 
  fallbackLng: 'en',
  ns: ['translation'], // Ensure namespace is loaded
  defaultNS: 'translation', // Default namespace
  interpolation: { escapeValue: false },
});

// Mock the global fetch function
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Helper to render the component
const renderContactForm = (onClose = vi.fn()) => {
  return render(
    <I18nextProvider i18n={i18next}>
      <ContactForm onClose={onClose} />
    </I18nextProvider>
  );
};

describe('ContactForm component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockOnClose.mockClear();
    mockFetch.mockClear();
    // Default mock successful fetch response
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ success: true }) }); 
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render all form fields, submit button, and close button', () => {
    renderContactForm(mockOnClose);

    expect(screen.getByLabelText('form.name')).toBeInTheDocument();
    expect(screen.getByLabelText('form.email')).toBeInTheDocument();
    expect(screen.getByLabelText('form.company')).toBeInTheDocument();
    expect(screen.getByLabelText('form.role')).toBeInTheDocument();
    expect(screen.getByLabelText('form.message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'form.submit' })).toBeInTheDocument();
    // Assuming the close button has an accessible name or title
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('should allow typing in form fields', async () => {
    const user = userEvent.setup();
    renderContactForm(mockOnClose);

    const nameInput = screen.getByLabelText('form.name');
    const emailInput = screen.getByLabelText('form.email');
    const messageInput = screen.getByLabelText('form.message');

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john.doe@example.com');
    await user.type(messageInput, 'Test message');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john.doe@example.com');
    expect(messageInput).toHaveValue('Test message');
  });

  it('should call onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    renderContactForm(mockOnClose);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should show validation errors for required fields on submit', async () => {
    const user = userEvent.setup();
    renderContactForm(mockOnClose);

    const submitButton = screen.getByRole('button', { name: 'form.submit' });
    await user.click(submitButton);

    // Expect multiple required field errors
    const errorMessages = await screen.findAllByText('form.required');
    expect(errorMessages.length).toBeGreaterThanOrEqual(3); // Expect at least name, email, message to be required
    expect(mockFetch).not.toHaveBeenCalled(); // Fetch shouldn't be called if validation fails
  });

  it('should show success message and call onClose after successful submission', async () => {
    const user = userEvent.setup();
    renderContactForm(mockOnClose);

    await user.type(screen.getByLabelText('form.name'), 'Jane Doe');
    await user.type(screen.getByLabelText('form.email'), 'jane.doe@test.com');
    await user.type(screen.getByLabelText('form.company'), 'Test Inc.');
    await user.type(screen.getByLabelText('form.role'), 'Tester');
    await user.type(screen.getByLabelText('form.message'), 'Successful submission test');

    const submitButton = screen.getByRole('button', { name: 'form.submit' });
    await user.click(submitButton);

    // Check if fetch was called (optional, good to verify)
    await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    // Check for success message
    expect(await screen.findByText('form.success')).toBeVisible();

    // Check if onClose was called after a delay (adjust timing if needed based on component)
    await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    }, { timeout: 4000 }); // Wait longer for potential timeouts in the component
  });

  it('should show error message on failed submission', async () => {
    // Override default mock to simulate failed fetch
    mockFetch.mockRejectedValueOnce(new Error('Network error')); 
    const user = userEvent.setup();
    renderContactForm(mockOnClose);

    await user.type(screen.getByLabelText('form.name'), 'Error Case');
    await user.type(screen.getByLabelText('form.email'), 'error@test.com');
    await user.type(screen.getByLabelText('form.message'), 'Testing error state');

    const submitButton = screen.getByRole('button', { name: 'form.submit' });
    await user.click(submitButton);

    // Check for error message
    expect(await screen.findByText('form.error')).toBeVisible();
    expect(mockOnClose).not.toHaveBeenCalled(); // onClose shouldn't be called on error
  });
}); 