const InputField = ({ value, onChange, error }) => {
  return (
    <div>
      <label className="text-lg font-medium dark:text-white" htmlFor="email">
        Email
      </label>
      <input
        className="w-full border-2 border-gray-100 dark:border-gray-500 rounded-xl p-4 mt-1 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
        type="email"
        name="email"
        id="email"
        value={value}
        onChange={onChange}
        placeholder="Email"
      />
      {error && <span className="block text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default InputField;