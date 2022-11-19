import React from "react";
import Button from "./form/Button";

function PopupError() {
  return (
    <>
      <div className="inset-0 fixed bg-black opacity-40"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white px-4 py-4 rounded min-w-[400px]">
          <h2 className="text-2xl">An Error Occured !!</h2>
          <p className="mt-1">Message</p>
          <div className="mt-4 flex justify-end">
            <Button label="Oke" />
          </div>
        </div>
      </div>
    </>
  );
}

export default PopupError;
