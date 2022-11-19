import React from "react";
import Button from "../../components/form/Button";
import InputField from "../../components/form/InputField";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../firebase-config";

function login() {
  const register = () => {
    const auth = getAuth(firebaseApp);
    const email = "yeremia997@gmail.com";
    const password = "pass789";
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        console.log(error.response);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div className="mt-6 flex gap-4 flex-col items-center justify-center text-left">
      <div className="justify-end flex gap-4 flex-col gap-4">
        <InputField label="Email" />
        <InputField label="Password" />
        <div className="flex justify-end gap-4 mt-2">
          <Button label="Submit" onClick={register} />
        </div>
      </div>
    </div>
  );
}

export default login;
