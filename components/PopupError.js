import React from "react";

function PopupError() {
  return (
    <>
      <div className="inset-0 fixed bg-black opacity-40"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white px-4 py-4 rounded">
          <h2 className="text-2xl">An Error Occured !!</h2>
        </div>
      </div>
    </>
  );
}

export default PopupError;
