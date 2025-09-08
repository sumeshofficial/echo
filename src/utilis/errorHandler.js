export const getError = (error) => {
  const code =
    error?.code ||
    (typeof error === "string" ? error.match(/\((.*?)\)/)?.[1] : "");

  const errorMap = {
    "auth/invalid-credential": "Invalid credentials. Please try again.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email": "The email address is badly formatted.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/popup-blocked": "Popup blocked by browser. Please allow popups.",
    "auth/popup-closed-by-user": "Popup closed before completing sign-in.",
    "auth/unauthorized-domain": "Sign-in not allowed from this domain.",
    "auth/operation-not-allowed":
      "This sign-in method is disabled. Enable it in Firebase console.",
    "auth/requires-recent-login": "Please reauthenticate and try again.",
    "auth/invalid-verification-code": "Invalid code. Please retry.",
    "auth/expired-action-code": "This code has expired. Please request again.",
    "auth/invalid-action-code": "Invalid or already used code.",
    // Add any other common codes here:
    // "auth/operation-not-supported-in-this-environment": ...
  };

  return errorMap[code] || "Something went wrong. Please try again.";
};
