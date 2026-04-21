import React from 'react';
import { useField } from 'formik';

const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  className = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  ...props
}) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  const getInputType = () => {
    if (type === 'password') {
      return 'password';
    }
    if (type === 'email') {
      return 'email';
    }
    if (type === 'number') {
      return 'number';
    }
    if (type === 'tel') {
      return 'tel';
    }
    if (type === 'textarea') {
      return 'textarea';
    }
    return 'text';
  };

  const inputClasses = `
    w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors
    ${hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
    ${inputClassName}
  `.trim();

  const labelClasses = `
    block text-sm font-medium mb-2
    ${hasError ? 'text-red-700' : 'text-gray-700'}
    ${labelClassName}
  `.trim();

  const errorClasses = `
    text-sm mt-1 text-red-600
    ${errorClassName}
  `.trim();

  const containerClasses = `
    form-group
    ${className}
  `.trim();

  const renderInput = () => {
    const inputProps = {
      ...field,
      ...props,
      id: name,
      type: getInputType(),
      placeholder,
      required,
      disabled,
      className: inputClasses,
    };

    if (type === 'textarea') {
      return (
        <textarea
          {...inputProps}
          rows={props.rows || 4}
        />
      );
    }

    if (type === 'select') {
      return (
        <select {...inputProps}>
          <option value="">Select an option</option>
          {props.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === 'checkbox') {
      return (
        <div className="flex items-center">
          <input
            {...inputProps}
            type="checkbox"
            className={`
              w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500
              ${hasError ? 'border-red-500' : ''}
              ${inputClassName}
            `.trim()}
          />
          {label && (
            <label htmlFor={name} className="ml-2 text-sm text-gray-700">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
        </div>
      );
    }

    return <input {...inputProps} />;
  };

  return (
    <div className={containerClasses}>
      {label && type !== 'checkbox' && (
        <label htmlFor={name} className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {renderInput()}
      
      {hasError && (
        <div className={errorClasses}>
          {meta.error}
        </div>
      )}
    </div>
  );
};

export default FormField;
