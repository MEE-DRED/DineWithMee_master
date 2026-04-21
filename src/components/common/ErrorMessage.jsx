import React from 'react';
import { useField } from 'formik';

const ErrorMessage = ({ name, className = '', ...props }) => {
  const [, meta] = useField(name);
  
  if (!meta.touched || !meta.error) {
    return null;
  }

  const errorClasses = `
    text-sm mt-1 text-red-600 font-medium
    ${className}
  `.trim();

  return (
    <div className={errorClasses} {...props}>
      {meta.error}
    </div>
  );
};

export default ErrorMessage;
