import React from "react";

function Button({
  label = "Label",
  bgClass = "bg-blue-400",
  type = "button",
  disabled,
  onClick = () => {},
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded text-white ${bgClass}`}
    >
      {label}
    </button>
  );
}

export default Button;
