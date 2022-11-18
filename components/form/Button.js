import React from "react";

function Button({ label, bgClass = "bg-blue-400 " }) {
  return <button className={`px-4 py-2 rounded text-white ${bgClass}`}>{label}</button>;
}

export default Button;
