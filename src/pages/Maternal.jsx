import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Maternal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Health page maternal section
    navigate('/health#maternal-care-pathway');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-emerald-900 mb-4">
          Redirecting to Maternal Care Pathway...
        </h1>
        <p className="text-gray-600">
          You'll be redirected to the Health Hub maternal section.
        </p>
      </div>
    </div>
  );
};

export default Maternal;
