import React from "react";

function RadioButton({ label }) {
  return (
    <div>
      <input id="test" type="radio" />
      <label htmlFor="test" className="ml-4">
        {label}
      </label>
    </div>
  );
}

export default RadioButton;
