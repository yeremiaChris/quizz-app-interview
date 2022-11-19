import React from "react";

function InputField({
  label,
  type = "text",
  value,
  placeholder = label + "...",
  errorMessage,
  onChange = () => {},
}) {
  const handleChange = (e) => {
    onChange(e, label);
  };
  // convert key to titile
  const toTitle = (text) => {
    return text
      .split(/(?=[A-Z])/)
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ");
  };
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-700">
        {toTitle(label)}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={label}
          id={label}
          value={value}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border focus:ring-none sm:text-sm focus:outline-none outline-none border px-4 py-2"
          placeholder={placeholder}
          onChange={handleChange}
        />
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default InputField;
