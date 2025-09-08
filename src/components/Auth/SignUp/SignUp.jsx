import { useState } from "react";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import SignUpHeader from "./SignUpHeader";
import SignUpButton from "./SignUpButton";
import SignUpFooter from "./SignUpFooter";
import { signUpValidate } from "../../../utilis/validation";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import SignUpGoogleButton from "./SignUpGoogleButton";
import { getError } from "../../../utilis/errorHandler";

const SignUp = ({ switchMode, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    setErrors(signUpValidate(updatedForm));
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = signUpValidate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (!isRegistering) {
        try {
          const { username, email, password } = formData;
          setIsRegistering(true);
          await doCreateUserWithEmailAndPassword(username, email, password);
          onClose();
        } catch (err) {
          setErrorMessage(getError(err.message));
          setIsRegistering(false);
        }
      }
    }
  };

  const onGoogleSignIn = async () => {
    if (!isRegistering) {
      try {
        setIsRegistering(true);
        await doSignInWithGoogle();
        onClose();
      } catch (error) {
        setIsRegistering(false);
        console.log(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="my-5">
        <SignUpHeader />
        {errorMessage && (
          <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
        )}
        <div className="mt-8">
          <InputField
            label="Name"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            placeholder="Name"
          />

          <InputField
            label="Email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Email"
          />

          <PasswordField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            errors={errors.password}
            placeholder="Password"
          />

          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            errors={errors.confirmPassword}
            placeholder="Confirm Password"
          />
          <SignUpButton />
        </div>
      </form>
      <SignUpGoogleButton doCreateUserWithGoogle={onGoogleSignIn} />
      <SignUpFooter switchMode={switchMode} />
    </div>
  );
};

export default SignUp;
