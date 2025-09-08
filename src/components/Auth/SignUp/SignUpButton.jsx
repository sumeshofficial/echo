const SignUpButton = ({ isRegistering }) => (
  <div className="mt-8 flex flex-col gap-y-4">
    <button
      className={`py-3 rounded-xl bg-violet-500 active:scale-[.98] active:duration-75 text-white text-lg font-bold hover:scale-[1.01] transition-all ${
        isRegistering
          ? "opacity-70 cursor-not-allowed"
          : "hover:scale-[1.01] active:scale-[.98] active:duration-75"
      }`}
    >
      {isRegistering ? (
        <span className="loader mr-2"></span>
      ) : null}
      {isRegistering ? "Registering..." : "Sign up"}
    </button>
  </div>
);

export default SignUpButton;
