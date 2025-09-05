const SignInFooter = ({ switchMode }) => (
  <div className="flex mt-8 justify-center items-center">
    <p className="font-medium text-base dark:text-white">
      Don't have an account?
    </p>
    <button
      onClick={switchMode}
      className="text-violet-500 text-base font-medium ml-2"
    >
      Sign up
    </button>
  </div>
);

export default SignInFooter;