// Validation helper functions
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-+()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name) && name.trim().length >= 2;
};

export const getPasswordStrength = (password) => {
  if (!password) return { strength: 0, label: 'Very Weak', color: 'red' };
  
  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  Object.values(checks).forEach(passed => {
    if (passed) strength++;
  });

  const strengthLevels = {
    0: { label: 'Very Weak', color: 'red' },
    1: { label: 'Weak', color: 'orange' },
    2: { label: 'Fair', color: 'yellow' },
    3: { label: 'Good', color: 'blue' },
    4: { label: 'Strong', color: 'green' },
    5: { label: 'Very Strong', color: 'green' },
  };

  return {
    strength,
    ...strengthLevels[strength],
    checks,
  };
};

export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined;
};

export const validateMinLength = (value, min) => {
  if (typeof value === 'string') {
    return value.trim().length >= min;
  }
  if (Array.isArray(value)) {
    return value.length >= min;
  }
  return false;
};

export const validateMaxLength = (value, max) => {
  if (typeof value === 'string') {
    return value.trim().length <= max;
  }
  if (Array.isArray(value)) {
    return value.length <= max;
  }
  return false;
};

export const validateRange = (value, min, max) => {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};

export const validateInteger = (value) => {
  const num = Number(value);
  return !isNaN(num) && Number.isInteger(num);
};

export const validatePositive = (value) => {
  const num = Number(value);
  return !isNaN(num) && num > 0;
};
