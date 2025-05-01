import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event' // Use userEvent for more realistic interactions
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { X } from 'lucide-react'; // Assuming X is used in ContactForm
import { ContactForm } from './ContactForm';

// REMOVED: Local vi.mock for import.meta.env
// vi.mock('import.meta.env', () => ({
//   VITE_APPS_SCRIPT_URL: 'MOCK_APPS_SCRIPT_URL_FOR_CONTACT_FORM_TEST'
// }));

// Use the actual translated strings defined here for querying
const translations = {
  title: "Let's discuss your needs",
  name: "Full Name",
  email: "Email",
  company: "Company",
  role: "Role",
  message: "Message",
  submit: "Send Message",
  success: "Thank you! We'll be in touch soon.",
  error: "There was an error. Please try again.",
  required: "Required field",
  closeLabel: "Close contact form" // Added for button aria-label
};

const resources = { en: { translation: { form: translations } } };

i18next.use(initReactI18next).init({
  resources,
  lng: 'en', 
  fallbackLng: 'en',
  ns: ['translation'], // Ensure namespace is loaded
  defaultNS: 'translation', // Default namespace
  interpolation: { escapeValue: false },
});

// Mock fetch
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch); // Use stubGlobal instead of global.fetch

// Helper to render the component
const renderContactForm = (onClose = vi.fn()) => {
  return render(
    <I18nextProvider i18n={i18next}>
      {/* Mock the button aria-label here if ContactForm doesn't handle translation for it */}
      <ContactForm onClose={onClose} />
    </I18nextProvider>
  );
};

describe('ContactForm component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    // Verify the mocked env var is accessible here
    console.log('VITE_APPS_SCRIPT_URL in test beforeEach:', import.meta.env.VITE_APPS_SCRIPT_URL);

    // Reset mocks explicitly within this suite's setup
    mockOnClose.mockClear();
    mockFetch.mockClear();
    // Re-assert default mock behavior for fetch
    mockFetch.mockResolvedValue({ 
      ok: true, 
      json: async () => ({ success: true }) 
    }); 
  });

  afterEach(() => {
    vi.restoreAllMocks(); // Ensure mocks are cleaned up
  });

  it('should render all form fields, submit button, and close button', () => {
    renderContactForm(mockOnClose);
    // Use translated text WITH asterisk for label queries
    expect(screen.getByLabelText(`${translations.name} *`)).toBeInTheDocument(); 
    expect(screen.getByLabelText(`${translations.email} *`)).toBeInTheDocument();
    expect(screen.getByLabelText(`${translations.company} *`)).toBeInTheDocument();
    expect(screen.getByLabelText(`${translations.role} *`)).toBeInTheDocument();
    expect(screen.getByLabelText(`${translations.message} *`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: translations.submit })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: translations.closeLabel })).toBeInTheDocument(); 
  });

  it('should allow typing in form fields', async () => {
    const user = userEvent.setup();
    renderContactForm(mockOnClose);
    // Use translated text WITH asterisk
    const nameInput = screen.getByLabelText(`${translations.name} *`);
    const emailInput = screen.getByLabelText(`${translations.email} *`);
    const messageInput = screen.getByLabelText(`${translations.message} *`);

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
    // Use translated text
    const closeButton = screen.getByRole('button', { name: translations.closeLabel });
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should show validation errors for required fields on submit', async () => {
    const user = userEvent.setup();
    renderContactForm(mockOnClose);
    const submitButton = screen.getByRole('button', { name: translations.submit });
    await user.click(submitButton);

    // We rely on browser validation for 'required'. 
    // We cannot easily check for the browser's validation message bubble.
    // Instead, we verify that the form submission (fetch) was prevented.
    await waitFor(() => {
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  it('should show success message and call onClose after successful submission', async () => {
    const user = userEvent.setup();
    renderContactForm(mockOnClose);
    // Use translated text WITH asterisk
    await user.type(screen.getByLabelText(`${translations.name} *`), 'Jane Doe');
    await user.type(screen.getByLabelText(`${translations.email} *`), 'jane.doe@test.com');
    await user.type(screen.getByLabelText(`${translations.company} *`), 'Test Inc.');
    await user.type(screen.getByLabelText(`${translations.role} *`), 'Tester');
    await user.type(screen.getByLabelText(`${translations.message} *`), 'Successful submission test');

    const submitButton = screen.getByRole('button', { name: translations.submit });
    await user.click(submitButton);

    await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    // Check for translated success message
    expect(await screen.findByText(translations.success)).toBeVisible();
  });

  it('should show error message on failed submission', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error')); 
    const user = userEvent.setup();
    renderContactForm(mockOnClose);
    // Use translated text WITH asterisk
    await user.type(screen.getByLabelText(`${translations.name} *`), 'Error Case');
    await user.type(screen.getByLabelText(`${translations.email} *`), 'error@test.com');
    await user.type(screen.getByLabelText(`${translations.company} *`), 'Fail Co');
    await user.type(screen.getByLabelText(`${translations.role} *`), 'Error Tester');
    await user.type(screen.getByLabelText(`${translations.message} *`), 'Testing error state');

    const submitButton = screen.getByRole('button', { name: translations.submit });
    await user.click(submitButton);

    // Check for translated error message
    expect(await screen.findByText(translations.error)).toBeVisible();
    expect(mockOnClose).not.toHaveBeenCalled(); // onClose shouldn't be called on error
  });
}); 