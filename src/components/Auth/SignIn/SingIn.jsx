import { useState } from "react";
import { signInValidate } from "../../../utilis/validation";
import SignInHeader from "./SignInHeader";
import SignInButtons from "./SignInButtons";
import SignInFooter from "./SignInFooter";
import InputField from "./InputField";
import PasswordField from "./PasswordField";

const SignIn = ({ switchMode }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    setErrors(signInValidate(updatedForm));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = signInValidate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert("Form submitted successfully ✅");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-5">
      <SignInHeader />

      <div className="mt-8">
        <InputField
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <PasswordField
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="mt-3 flex justify-end">
          <button className="font-medium text-base text-violet-500">
            Forgot password?
          </button>
        </div>

        <SignInButtons />
        <SignInFooter switchMode={switchMode} />
      </div>
    </form>
  );
};

export default SignIn;
