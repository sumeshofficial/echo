import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="text-lg font-medium dark:text-white" htmlFor="password">
        Password
      </label>
      <div className="relative">
        <input
          className="w-full border-2 border-gray-100 dark:border-gray-500 rounded-xl p-4 mt-1 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          value={value}
          onChange={onChange}
          placeholder="Password"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {error && <span className="block text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default PasswordInput;