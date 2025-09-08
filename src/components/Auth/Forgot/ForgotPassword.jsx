import { useState } from "react";
import ForgotHeader from "./ForgotHeader";
import ForgotButton from "./ForgotButton";
import ForgotInput from "./ForgotInput";
import { doPasswordReset } from "../../../firebase/auth";
import { getError } from "../../../utilis/errorHandler";
import ForgotSuccess from "./ForgotSuccess";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isForgot, setIsForgot] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") return setErrorMessage("Email requird");
    if (!isForgot) {
      try {
        setIsForgot(true);
        await doPasswordReset(email);
        setEmailSent(true);
      } catch (err) {
        setErrorMessage(getError(err.message));
        setIsForgot(false);
      }
    }
  };

  return (
    <div>
      {!emailSent ? (
        <form onSubmit={handleSubmit} className="my-5">
          <ForgotHeader />
          {errorMessage && (
            <p className="text-red-500 mt-2 text-lg text-center">{errorMessage}</p>
          )}
          <div className="mt-8">
            <ForgotInput
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
            />
            <ForgotButton isForgot={isForgot}/>
          </div>
        </form>
      ) : (
        <ForgotSuccess email={email} />
      )}
    </div>
  );
};

export default ForgotPassword;
