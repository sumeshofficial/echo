import { useContext, useState } from "react";
import { signInValidate } from "../../../utilis/validation";
import SignInHeader from "./SignInHeader";
import SignInButton from "./SignInButton";
import SignInFooter from "./SignInFooter";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import {
  doSignInUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import SignInGoogleButton from "./SignInGoogleButton";
import { getError } from "../../../utilis/errorHandler";
import ForgotPassword from "../Forgot/ForgotPassword";
import Modal from "../../Modal";
import { Link } from "react-router";
import ModalContext from "../../../contexts/modalContext/ModalContext";

const SignIn = ({ switchMode }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setModal] = useState(false);
  const { onClose } = useContext(ModalContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    setErrors(signInValidate(updatedForm));
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = signInValidate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (!isSigningIn) {
        try {
          const { email, password } = formData;
          setIsSigningIn(true);
          await doSignInUserWithEmailAndPassword(email, password);
          onClose();
        } catch (err) {
          setErrorMessage(getError(err.message));
          setIsSigningIn(false);
        }
      }
    }
  };

  const onGoogleSignIn = async () => {
    if (!isSigningIn) {
      try {
        setIsSigningIn(true);
        await doSignInWithGoogle();
        onClose();
      } catch (error) {
        setIsSigningIn(false);
        console.log(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="my-5">
        <SignInHeader />
        {errorMessage && (
          <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
        )}
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
            <Link
              onClick={() => {
                setModal(true);
              }}
              className="font-medium text-base text-violet-500"
            >
              Forgot password?
            </Link>
          </div>
          <SignInButton isSigningIn={isSigningIn}/>
        </div>
      </form>
      <SignInGoogleButton signInWithGoogle={onGoogleSignIn} />
      <SignInFooter switchMode={switchMode} />

      {showModal && (
        <Modal open={showModal} onClose={() => setModal(false)}>
            <ForgotPassword
              onClose={() => setModal(false)}
            />
        </Modal>
      )}
    </div>
  );
};

export default SignIn;
