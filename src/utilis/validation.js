export const signUpValidate = (data) => {
  const validationErrors = {};

  if (!data.username.trim()) {
    validationErrors.username = "Username is required";
  } else if (data.username.length < 3) {
    validationErrors.username = "Username should be at least 3 characters";
  }

  if (!data.email.trim()) {
    validationErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    validationErrors.email = "Email is not valid";
  }

  if (!data.password.trim()) {
    validationErrors.password = ["Password is required"];
  } else {
    const passwordErrors = [];

    if (data.password.length < 6) {
      passwordErrors.push("At least 6 characters");
    }
    if (!/[A-Z]/.test(data.password)) {
      passwordErrors.push("At least 1 uppercase letter");
    }
    if (!/[a-z]/.test(data.password)) {
      passwordErrors.push("At least 1 lowercase letter");
    }
    if (!/\d/.test(data.password)) {
      passwordErrors.push("At least 1 number");
    }
    if (!/[@$!%*?&]/.test(data.password)) {
      passwordErrors.push("At least 1 special character (@$!%*?&)");
    }

    if (passwordErrors.length > 0) {
      validationErrors.password = passwordErrors;
    }
  }

  if (data.confirmPassword.trim() !== data.password.trim()) {
    validationErrors.confirmPassword = "Passwords do not match";
  }

  return validationErrors;
};

export const signInValidate = (data) => {
  const validationErrors = {};

  if (!data.email.trim()) {
    validationErrors.email = "Email is required";
  }

  if (!data.password.trim()) {
    validationErrors.password = "Password is required";
  }

  return validationErrors;
};