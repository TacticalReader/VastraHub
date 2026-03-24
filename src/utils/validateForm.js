export function validateSignup(name, email, password, confirmPassword) {
  const errors = {};
  
  if (!name || name.trim() === '') {
    errors.name = 'Name is required';
  }
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Valid email is required (must contain @)';
  }
  
  if (!password || password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateLogin(email, password) {
  const errors = {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Valid email is required';
  }

  if (!password || password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
