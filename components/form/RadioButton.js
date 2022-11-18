import React from "react";

function RadioButton({ label, modelValue, value, onChange }) {
  return (
    <div className="mb-2">
      <input
        className="cursor-pointer"
        id={label}
        value={value}
        type="radio"
        checked={value === modelValue}
        onChange={onChange}
      />
      <label htmlFor={label} className="ml-4 cursor-pointer">
        {label}
      </label>
    </div>
  );
}

export default RadioButton;
