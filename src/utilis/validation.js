const sanitize = (str = "") => {
  return str
    .replace(/[\u200B-\u200F\uFEFF\u3164]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const sanitizeUsername = (str = "") => {
  return sanitize(str).replace(/[^a-zA-Z0-9_]/g, "");
};

export const signUpValidate = (data) => {
  const validationErrors = {};

  const username = sanitizeUsername(data.username);
  const email = sanitize(data.email);
  const password = sanitize(data.password);
  const confirmPassword = sanitize(data.confirmPassword);

  // Username validation
  if (!username) {
    validationErrors.username = "Username is required";
  } else if (username.length < 3) {
    validationErrors.username = "Username should be at least 3 characters";
  }

  // Email validation
  if (!email) {
    validationErrors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    validationErrors.email = "Email is not valid";
  }

  // Password validation
  if (!password) {
    validationErrors.password = ["Password is required"];
  } else {
    const passwordErrors = [];
    if (password.length < 6) passwordErrors.push("At least 6 characters");
    if (!/[A-Z]/.test(password)) passwordErrors.push("At least 1 uppercase letter");
    if (!/[a-z]/.test(password)) passwordErrors.push("At least 1 lowercase letter");
    if (!/\d/.test(password)) passwordErrors.push("At least 1 number");
    if (!/[@$!%*?&]/.test(password)) passwordErrors.push("At least 1 special character (@$!%*?&)");
    if (passwordErrors.length > 0) validationErrors.password = passwordErrors;
  }

  // Confirm password
  if (confirmPassword !== password) {
    validationErrors.confirmPassword = "Passwords do not match";
  }

  return validationErrors;
};

export const signInValidate = (data) => {
  const validationErrors = {};

  const email = sanitize(data.email);
  const password = sanitize(data.password);

  if (!email) {
    validationErrors.email = "Email is required";
  }

  if (!password) {
    validationErrors.password = "Password is required";
  }

  return validationErrors;
};

