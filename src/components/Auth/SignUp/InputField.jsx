const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div className="mb-4">
      <label className="text-lg font-medium dark:text-white" htmlFor={name}>
        {label}
      </label>
      <input
        className="w-full border-2 border-gray-100 dark:border-gray-500 rounded-xl p-4 mt-1 
                   bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span className="block text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default InputField;
