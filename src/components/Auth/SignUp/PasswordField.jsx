import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordField = ({
  label,
  name,
  value,
  onChange,
  errors,
  placeholder,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-4">
      <label className="text-lg font-medium dark:text-white" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <input
          className="w-full border-2 border-gray-100 dark:border-gray-500 rounded-xl p-4 mt-1 
                     bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          type={show ? "text" : "password"}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {Array.isArray(errors) ? (
        <ul className="text-red-500 text-sm mt-2">
          {errors.map((err, i) => (
            <li key={i}>• {err}</li>
          ))}
        </ul>
      ) : (
        errors && <span className="block text-red-500 mt-1">{errors}</span>
      )}
    </div>
  );
};

export default PasswordField;
