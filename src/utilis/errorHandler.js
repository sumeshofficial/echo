export const getError = (code) => {
  switch (code) {
    case "Firebase: Error (auth/invalid-credential).":
      return "Invalid email or password.";
    case "Firebase: Error (auth/user-not-found).":
      return "No account found with this email.";
    case "Firebase: Error (auth/wrong-password).":
      return "Incorrect password.";
    default:
      return "Something went wrong. Please try again.";
  }
};