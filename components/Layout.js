import React from "react";

export default function Layout({ children }) {
  return (
    <div className="mx-3 md:container md:mx-auto mt-10 flex justify-center items-center">
      <main className="flex-1">{children}</main>
    </div>
  );
}
