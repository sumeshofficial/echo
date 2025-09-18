const SignInButton = ({isSigningIn}) => (
  <div className="mt-8 flex flex-col gap-y-4">
    <button
      className={`py-3 rounded-xl bg-violet-500 text-white text-lg font-bold transition-all ${
        isSigningIn
          ? "opacity-70 cursor-not-allowed"
          : "hover:scale-[1.01] active:scale-[.98] active:duration-75"
      }`}
    >
      {isSigningIn ? (
        <span className="loader mr-2"></span>
      ) : null}
      {isSigningIn ? "Signing in..." : "Sign in"}
    </button>
  </div>
);

export default SignInButton;
