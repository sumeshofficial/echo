import { useState } from "react";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import SignUpHeader from "./SignUpHeader";
import SignUpButtons from "./SignUpButtons";
import SignUpFooter from "./SignUpFooter";
import {signInValidate} from "../../../utilis/validation";

const SignUp = ({ switchMode }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
      <SignUpHeader />

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

        <SignUpButtons />
        <SignUpFooter switchMode={switchMode} />
      </div>
    </form>
  );
};

export default SignUp;
