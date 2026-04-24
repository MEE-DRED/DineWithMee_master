// ============================================
// SIGNUP MULTI-STEP FORM LOGIC
// ============================================

let currentStep = 1;
const totalSteps = 3;
const form = document.getElementById('signup-form');

/**
 * Initialize the form on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  if (!form) return;
  attachFormListeners();
  toggleOtherConditionField();
  updateProgressUI();
});

/**
 * Attach event listeners to form inputs
 */
function attachFormListeners() {
  // Allow Enter key to continue on Step 1
  const step1Inputs = document.querySelectorAll('section[data-step="1"] input');
  step1Inputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        nextStep();
      }
    });
  });

  const healthConditions = document.getElementById('health-conditions');
  healthConditions?.addEventListener('change', toggleOtherConditionField);

  // Form submission
  form.addEventListener('submit', handleFormSubmit);
}

/**
 * Navigate to the next step
 */
function nextStep() {
  if (currentStep < totalSteps && validateCurrentStep()) {
    currentStep++;
    updateProgressUI();
  }
}

/**
 * Navigate to the previous step
 */
function previousStep() {
  if (currentStep > 1) {
    currentStep--;
    updateProgressUI();
  }
}

/**
 * Validate the current step's required fields
 */
function validateCurrentStep() {
  clearCurrentStepErrors();

  const currentStepSection = document.querySelector(`section[data-step="${currentStep}"]`);
  if (!currentStepSection) return false;

  let isValid = true;

  // Get all required inputs in this step
  const requiredFields = currentStepSection.querySelectorAll('[required]');

  // Check text inputs, emails, numbers, selects
  requiredFields.forEach(field => {
    const value = typeof field.value === 'string' ? field.value.trim() : field.value;
    const isMultipleSelect = field.tagName === 'SELECT' && field.multiple;
    const hasMultipleSelection = isMultipleSelect && Array.from(field.selectedOptions).length > 0;

    if (isMultipleSelect && !hasMultipleSelection) {
      isValid = false;
      showFieldError(field, 'Please select at least one option');
      return;
    }

    if (!isMultipleSelect && (value === '' || Number(value) === 0)) {
      isValid = false;
      if (field.type === 'email') {
        showFieldError(field, 'Email is required');
      } else if (field.type === 'password') {
        showFieldError(field, 'Password is required');
      } else if (field.type === 'number') {
        showFieldError(field, 'This field is required');
      } else {
        showFieldError(field, 'This field is required');
      }
    } else {
      clearFieldError(field);
    }

    // Additional validation for specific fields
    if (field.id === 'password' && value.length < 6) {
      showFieldError(field, 'Password must be at least 6 characters');
      isValid = false;
    }

    if (field.type === 'email' && value && !isValidEmail(value)) {
      showFieldError(field, 'Please enter a valid email address');
      isValid = false;
    }

    if (field.type === 'number' && value && Number(value) <= 0) {
      showFieldError(field, 'Please enter a valid value');
      isValid = false;
    }
  });

  if (currentStep === 2) {
    const healthGoalSelect = document.getElementById('health-goal');
    if (healthGoalSelect && !healthGoalSelect.value) {
      showFieldError(healthGoalSelect, 'Please select a health goal');
      isValid = false;
    }

    const healthConditionValues = getSelectedValues('health-conditions');
    const hasOther = healthConditionValues.includes('other');
    const otherConditionInput = document.getElementById('other-condition-text');

    if (hasOther && otherConditionInput && !otherConditionInput.value.trim()) {
      showFieldError(otherConditionInput, 'Please type your other condition');
      isValid = false;
    }
  }

  if (currentStep === 3) {
    const activityLevelSelect = document.getElementById('activity-level');
    if (activityLevelSelect && !activityLevelSelect.value) {
      showFieldError(activityLevelSelect, 'Please select your activity level');
      isValid = false;
    }
  }

  return isValid;
}

/**
 * Display error message for a field
 */
function showFieldError(field, message) {
  field.classList.add('error');
  const wrapper = field.closest('.form-group');
  const errorDisplay = wrapper ? wrapper.querySelector('.error-message') : null;
  if (errorDisplay) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = 'block';
  }
}

/**
 * Clear error message for a field
 */
function clearFieldError(field) {
  field.classList.remove('error');
  const wrapper = field.closest('.form-group');
  const errorDisplay = wrapper ? wrapper.querySelector('.error-message') : null;
  if (errorDisplay) {
    errorDisplay.textContent = '';
    errorDisplay.style.display = 'none';
  }
}

function clearCurrentStepErrors() {
  const currentStepSection = document.querySelector(`section[data-step="${currentStep}"]`);
  if (!currentStepSection) return;

  currentStepSection.querySelectorAll('input, select, textarea').forEach(field => {
    field.classList.remove('error');
  });

  currentStepSection.querySelectorAll('.error-message').forEach(errorDisplay => {
    errorDisplay.textContent = '';
    errorDisplay.style.display = 'none';
  });
}

function getSelectedValues(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return [];
  return Array.from(select.selectedOptions).map(option => option.value);
}

function toggleOtherConditionField() {
  const healthConditions = document.getElementById('health-conditions');
  const otherWrapper = document.getElementById('other-condition-wrapper');
  const otherInput = document.getElementById('other-condition-text');

  if (!healthConditions || !otherWrapper || !otherInput) return;

  const selectedValues = Array.from(healthConditions.selectedOptions).map(option => option.value);
  const hasNone = selectedValues.includes('none');

  if (hasNone && selectedValues.length > 1) {
    Array.from(healthConditions.options).forEach(option => {
      option.selected = option.value === 'none';
    });
  }

  const showOther = selectedValues.includes('other') && !selectedValues.includes('none');
  otherWrapper.hidden = !showOther;
  otherInput.required = showOther;

  if (!showOther) {
    otherInput.value = '';
    clearFieldError(otherInput);
  }
}

/**
 * Update the UI to show the current step
 */
function updateProgressUI() {
  // Hide all steps
  document.querySelectorAll('.signup-step').forEach(step => {
    step.hidden = true;
    step.classList.remove('active');
  });

  // Show current step
  const currentStepElement = document.querySelector(`section[data-step="${currentStep}"]`);
  if (currentStepElement) {
    currentStepElement.hidden = false;
    currentStepElement.classList.add('active');
  }

  // Update progress bar
  const progressFill = document.getElementById('progressFill');
  const progressPercent = (currentStep / totalSteps) * 100;
  progressFill.style.width = progressPercent + '%';

  // Update progress indicators
  document.querySelectorAll('.progress-step').forEach((step, index) => {
    if (index + 1 <= currentStep) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });

  // Scroll to top of form
  currentStepElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateCurrentStep()) {
    return;
  }

  // Collect form data
  const formData = {
    // Step 1: Basic Info
    fullName: document.getElementById('full-name').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
    country: document.getElementById('country').value.trim(),

    // Step 2: Health Profile
    healthGoal: document.getElementById('health-goal').value,
    healthConditions: getSelectedValues('health-conditions'),
    otherCondition: document.getElementById('other-condition-text').value.trim(),
    dietaryPreferences: getSelectedValues('dietary-preferences'),
    allergies: getSelectedValues('allergies'),

    // Step 3: Lifestyle & Personalization
    age: document.getElementById('age').value,
    gender: document.getElementById('gender').value,
    weight: document.getElementById('weight').value,
    height: document.getElementById('height').value,
    activityLevel: document.getElementById('activity-level').value,
    wantsMealPlan: document.getElementById('meal-plan-preference').value === 'yes',
    timestamp: new Date().toISOString(),
  };

  console.log('Form Data:', formData);

  // Send to backend or local storage
  submitSignupForm(formData);
}

/**
 * Submit the signup form data
 */
function submitSignupForm(formData) {
  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Creating Account...';

  // Simulate API call or send to your backend
  setTimeout(() => {
    // In production, you would send this to your backend
    console.log('Submitting form data:', formData);

    const authUser = {
      name: formData.fullName,
      email: formData.email,
      country: formData.country,
      initials: getInitials(formData.fullName),
      signedInAt: new Date().toISOString(),
    };

    // Store signup profile and auto-login user state.
    sessionStorage.setItem('signupFormData', JSON.stringify(formData));
    localStorage.setItem('dwm_user', JSON.stringify(authUser));
    localStorage.setItem('dwm_logged_in', 'true');
    window.dispatchEvent(new CustomEvent('dwm:auth-changed', { detail: authUser }));

    // Redirect as logged-in user.
    handleSignupSuccess(authUser);

    // Reset button
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }, 900);
}

/**
 * Handle successful form submission
 */
function handleSignupSuccess(authUser) {
  const firstName = authUser.name.split(' ')[0] || 'there';
  alert(`Welcome, ${firstName}! Your account was created and you are now logged in.`);
  window.location.href = 'index.html';
}

function getInitials(fullName) {
  if (!fullName) return 'U';
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map(part => part[0].toUpperCase()).join('') || 'U';
}

/**
 * Real-time field validation
 */
document.addEventListener('change', (e) => {
  if (e.target.type === 'email') {
    const email = e.target.value.trim();
    if (email && !isValidEmail(email)) {
      showFieldError(e.target, 'Please enter a valid email address');
    } else {
      clearFieldError(e.target);
    }
  }

  if (e.target.type === 'number') {
    if (e.target.value && e.target.value <= 0) {
      showFieldError(e.target, 'Please enter a valid value');
    } else {
      clearFieldError(e.target);
    }
  }
});

/**
 * Email validation helper
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Password strength indicator (optional enhancement)
 */
function getPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[^a-zA-Z0-9]/)) strength++;
  return strength;
}
