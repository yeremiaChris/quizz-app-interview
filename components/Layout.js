import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import React from "react";
import Button from "./form/Button";
import PopupError from "./PopupError";

function Layout({ children }) {
  const router = useRouter();
  const isError = false;
  const logout = () => {
    router.push("/auth/login");
    deleteCookie("user");
  };
  return (
    <div className="mx-3 md:container md:mx-auto mt-6 flex justify-center items-center">
      {isError && <PopupError />}

      {!router.pathname.includes("auth") ? (
        <div className="flex-1 flex flex-col gap-6 items-start">
          <div className="flex gap-3">
            {/* <Button label="Login" />
            <Button label="Register" /> */}
            <Button label="Logout" bgClass="bg-red-400" onClick={logout} />
          </div>
          <main className="w-full">{children}</main>
        </div>
      ) : (
        <div className="border text-center flex-1 py-7 px-4">
          <h1 className="uppercase text-lg font-medium">
            {router.pathname.includes("login") ? "Login" : "Register"} <br /> quizz{" "}
            <span className="text-blue-500"> app</span>
          </h1>
          <main className="w-full">{children}</main>
        </div>
      )}
    </div>
  );
}

export default Layout;
