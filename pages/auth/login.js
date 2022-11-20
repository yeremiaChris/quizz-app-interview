import React, { useState } from "react";
import Button from "../../components/form/Button";
import InputField from "../../components/form/InputField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { firebaseApp } from "../../firebase-config";
import { getCookie, setCookie } from "cookies-next";

function Login() {
  const router = useRouter();

  const initialState = {
    email: "",
    password: "",
  };
  const [loginForm, setLoginForm] = useState(initialState);
  const [errorField, setErrorField] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(null);

  // error handling
  const errorHandlingFieldSubmit = () => {
    let error = errorField;
    for (const key in loginForm) {
      if (Object.hasOwnProperty.call(loginForm, key)) {
        if (!loginForm[key].length) {
          error = { ...error, [key]: "This field is required." };
        }
      }
    }
    setErrorField(error);
  };

  // cek error
  const isError = () => {
    return Object.values(loginForm).every((el) => !el);
  };

  // onchange
  const onChange = (e, key) => {
    setLoginForm({ ...loginForm, [key]: e.target.value });
    setErrorField({ ...errorField, [key]: "" });
    setErrorMessage(null);
  };

  // submit
  const submit = () => {
    if (isError()) {
      errorHandlingFieldSubmit();
    } else {
      signIn();
    }
  };

  const signIn = () => {
    const auth = getAuth(firebaseApp);
    const { email, password } = loginForm;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setCookie("user", JSON.stringify(user));
        router.push("/");
        // ...
      })
      .catch((error) => {
        setErrorMessage(error.code);
      });
  };

  // redirect
  const redirect = () => {
    router.push("/auth/register");
  };
  return (
    <div className="mt-6 flex gap-4 flex-col items-center justify-center text-left">
      <p className="text-red-500">{errorMessage}</p>

      <div className="justify-end flex gap-4 flex-col gap-4">
        {Object.keys(loginForm).map((key) => {
          return (
            <InputField
              errorMessage={errorField[key]}
              value={loginForm[key]}
              key={key}
              label={key}
              onChange={onChange}
            />
          );
        })}
        {/* <InputField label="Password" /> */}
        <div className="flex justify-end gap-4 mt-2">
          <Button label="Register Page" onClick={redirect} />
          <Button label="Login" onClick={submit} />
        </div>
      </div>
    </div>
  );
}

export default Login;
