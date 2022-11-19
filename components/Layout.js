import React from "react";
import Button from "./form/Button";
// import PopupError from "./PopupError";

export default function Layout({ children }) {
  return (
    <div className="mx-3 md:container md:mx-auto mt-6 flex justify-center items-center">
      {/* <PopupError /> */}
      <div className="flex-1 flex flex-col gap-6 items-start">
        <div className="flex gap-3">
          <Button label="Login" />
          <Button label="Register" />
          <Button label="Logout" bgClass="bg-red-400" />
        </div>
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
