import React from "react";

function InputField({ label, placeholder = label + "..." }) {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type="email"
          name={label}
          id={label}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border focus:ring-none sm:text-sm focus:outline-none outline-none border px-4 py-2"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default InputField;
