import React from "react";
import Button from "../../components/form/Button";
import InputField from "../../components/form/InputField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function login() {
  const signIn = () => {
    const auth = getAuth();
    const email = "yeremia997@gmail.com";
    const password = "pass789";
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div className="mt-6 flex gap-4 flex-col items-center justify-center text-left">
      <div className="justify-end flex gap-4 flex-col gap-4">
        <InputField label="Email" />
        <InputField label="Password" />
        <div className="flex justify-end gap-4 mt-2">
          <Button label="Login" onClick={signIn} />
          <Button label="Register" />
        </div>
      </div>
    </div>
  );
}

export default login;
