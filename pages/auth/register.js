import React, { useState, useEffect } from "react";
import Button from "../../components/form/Button";
import InputField from "../../components/form/InputField";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../firebase-config";
import { useRouter } from "next/router";

function Register() {
  const [errorMessage, setErrorMessage] = useState(null);
  // local state
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [registerForm, setRegisterForm] = useState(initialState);
  const [errorField, setErrorField] = useState(initialState);
  const [isRequest, setIsRequest] = useState(false);
  const router = useRouter();

  // sign up
  const signUp = () => {
    const { email, password } = registerForm;
    const auth = getAuth(firebaseApp);
    setIsRequest(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        router.push("/auth/login");
        // ...
      })
      .catch((error) => {
        setErrorMessage(error.code);
        // ..
      })
      .finally(() => {
        setIsRequest(false);
      });
  };

  // error handling
  const errorHandlingFieldSubmit = () => {
    let error = errorField;
    for (const key in registerForm) {
      if (Object.hasOwnProperty.call(registerForm, key)) {
        if (!registerForm[key].length) {
          error = { ...error, [key]: "This field is required." };
          continue;
        }
        if (key === "confirmPassword") {
          error = { ...error, [key]: "This field should match with password" };
        }
      }
    }
    setErrorField(error);
  };

  // cek error
  const isError = () => {
    const isMatch = registerForm.password === registerForm.confirmPassword;
    return Object.values(registerForm).some((el) => !el) || !isMatch;
  };

  // onchange
  const onChange = (e, key) => {
    setRegisterForm({ ...registerForm, [key]: e.target.value });
    setErrorField({ ...errorField, [key]: "" });
    setErrorMessage(null);
  };

  // submit
  const submit = () => {
    if (isError()) {
      errorHandlingFieldSubmit();
    } else {
      signUp();
    }
  };

  // redirect
  const redirect = () => {
    router.push("/auth/login");
  };

  return (
    <div className="mt-6 flex gap-4 flex-col items-center justify-center text-left">
      <div className="justify-end flex gap-4 flex-col gap-4">
        <p className="text-red-500">{errorMessage}</p>
        {Object.keys(registerForm).map((key) => {
          return (
            <InputField
              errorMessage={errorField[key]}
              value={registerForm[key]}
              type={key === "email" ? "email" : "password"}
              key={key}
              label={key}
              disabled={isRequest}
              onChange={onChange}
            />
          );
        })}

        {/* <InputField label="Password" /> */}
        <div className="flex justify-end gap-4 mt-2">
          <Button label="Login Page" onClick={redirect} disabled={isRequest} />
          <Button label="Submit" onClick={submit} disabled={isRequest} />
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const user = context.req.cookies["user"];
  if (user) {
    return {
      redirect: {
        destination: "/",
        permanet: false,
      },
    };
  }

  return {
    props: {},
  };
}
export default Register;
