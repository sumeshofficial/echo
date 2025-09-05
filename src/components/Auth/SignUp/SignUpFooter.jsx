const SignUpFooter = ({ switchMode }) => (
  <div className="flex mt-8 justify-center items-center">
    <p className="font-medium text-base dark:text-white">
      Already have an account?
    </p>
    <button
      onClick={switchMode}
      className="text-violet-500 text-base font-medium ml-2"
    >
      Sign in
    </button>
  </div>
);

export default SignUpFooter;
