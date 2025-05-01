import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

interface ContactFormProps {
  onClose: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // =====================================================================
      // CONFIGURACIÓN DE ENVÍO A GOOGLE SHEETS
      // =====================================================================
      // La siguiente URL es donde se envían los datos del formulario.
      // Para enviar a Google Sheets, reemplaza 'YOUR_GOOGLE_APPS_SCRIPT_URL' 
      // con la URL de despliegue de tu propio Google Apps Script Web App.
      // 
      // Pasos básicos para crear el Apps Script:
      // 1. Abre Google Sheets y ve a "Extensiones" > "Apps Script".
      // 2. Escribe un script que reciba datos POST (función doPost(e)).
      // 3. El script debe parsear e.postData.contents (que será el JSON enviado).
      // 4. Luego, debe obtener la hoja activa (SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()).
      // 5. Añadir una nueva fila con los datos recibidos (sheet.appendRow([...])).
      // 6. Despliega el script como "Aplicación Web" (Web App).
      // 7. Autoriza el script para acceder a tus Google Sheets.
      // 8. Copia la URL de la aplicación web desplegada y pégala aquí.
      // 9. Asegúrate de que el despliegue permita el acceso anónimo (o configura la autenticación si es necesario).
      //
      // Alternativas: Puedes usar servicios como Formspree, Getform, etc., que te dan una URL 
      // y ellos gestionan el envío a Sheets u otros destinos.
      // =====================================================================
      
      // Get the API URL from environment variables
      const apiUrl = import.meta.env.VITE_APPS_SCRIPT_URL;

      // Check if the environment variable is defined
      if (!apiUrl) {
        console.error("Configuration Error: VITE_APPS_SCRIPT_URL is not defined in your .env file.");
        setStatus('error'); 
        // Optionally, provide a more specific error message to the user if desired
        setTimeout(() => setStatus('idle'), 5000); // Give more time to read the error
        return; // Stop submission if URL is missing
      }
      
      // Use the environment variable in the fetch call
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      setStatus('success');
      setFormData({ name: '', email: '', company: '', role: '', message: '' });
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 3000);
    } catch (err) { // Changed variable name to 'err' and now potentially using it
      console.error("Form submission error:", err); // Log the actual error
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000); // Give more time to read the error
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-secondary hover:text-primary transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">{t('form.title')}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                {t('form.name')} *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                {t('form.email')} *
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                {t('form.company')} *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                {t('form.role')} *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                {t('form.message')} *
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full btn btn-primary disabled:opacity-50"
            >
              {status === 'loading' ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div>
              ) : t('form.submit')}
            </button>

            {status === 'success' && (
              <p className="text-green-600 text-center">{t('form.success')}</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-center">{t('form.error')}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};