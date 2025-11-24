import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container-custom py-16 pt-32 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="mb-4">
          <a
            href="/Theodora-live-Privacy-Policy.pdf"
            download
            className="inline-block px-4 py-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors"
          >
            Download PDF
          </a>
        </div>

        <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
          <object
            data="/Theodora-live-Privacy-Policy.pdf"
            type="application/pdf"
            className="w-full"
            style={{ height: 'calc(100vh - 250px)', minHeight: '600px' }}
          >
            <iframe
              src="/Theodora-live-Privacy-Policy.pdf"
              className="w-full"
              style={{ height: 'calc(100vh - 250px)', minHeight: '600px' }}
              title="Privacy Policy"
            >
              <p className="p-4">
                Your browser does not support PDFs.
                <a href="/Theodora-live-Privacy-Policy.pdf" className="text-accent hover:underline ml-1">
                  Download the PDF
                </a>
                to view it.
              </p>
            </iframe>
          </object>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 