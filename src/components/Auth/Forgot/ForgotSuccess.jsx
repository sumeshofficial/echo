const ForgotSuccess = ({email}) => {
  return (
    <div className="text-center p-6">
      <h2 className="text-2xl text-black dark:text-white">
        Email sent
      </h2>
      <p className="mt-3 font-semibold text-gray-400 dark:text-gray-400">
        We’ve sent an password reset link to your <span className="font-semibold text-gray-600 dark:text-gray-300">{email}</span>.
      </p>
    </div>
  );
};

export default ForgotSuccess;