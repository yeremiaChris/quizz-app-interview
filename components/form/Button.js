import React from "react";

function Button({ label, bgClass = "bg-blue-400", disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded text-white ${bgClass}`}
    >
      {label}
    </button>
  );
}

export default Button;
