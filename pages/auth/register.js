import React, { useState } from "react";
import Button from "../../components/form/Button";
import InputField from "../../components/form/InputField";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../firebase-config";
import { useRouter } from "next/router";

function Register() {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  // local state
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [registerForm, setRegisterForm] = useState(initialState);

  const [errorField, setErrorField] = useState(initialState);

  // sign up
  const signUp = () => {
    const { email, password } = registerForm;
    const auth = getAuth(firebaseApp);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(userCredential);
        router.push("/auth/login");
        // ...
      })
      .catch((error) => {
        console.log(error.response);
        setErrorMessage(error.message);
        // ..
      });
  };

  // error handling
  const errorHandlingFieldSubmit = () => {
    let error = errorField;
    for (const key in registerForm) {
      if (Object.hasOwnProperty.call(registerForm, key)) {
        console.log(registerForm[key], key);
        if (!registerForm[key].length) {
          error = { ...error, [key]: "This field is required." };
        }
      }
    }
    setErrorField(error);
  };

  // cek error
  const isError = () => {
    return Object.values(registerForm).every((el) => !el);
  };

  // onchange
  const onChange = (e, key) => {
    setRegisterForm({ ...registerForm, [key]: e.target.value });
    setErrorField({ ...errorField, [key]: "" });
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
    //
  };

  return (
    <div className="mt-6 flex gap-4 flex-col items-center justify-center text-left">
      <div className="justify-end flex gap-4 flex-col gap-4">
        <p>{errorMessage}</p>
        {Object.keys(registerForm).map((key) => {
          return (
            <InputField
              errorMessage={errorField[key]}
              value={registerForm[key]}
              key={key}
              label={key}
              onChange={onChange}
            />
          );
        })}

        {/* <InputField label="Password" /> */}
        <div className="flex justify-end gap-4 mt-2">
          <Button label="Login Page" onClick={redirect} />
          <Button label="Submit" onClick={submit} />
        </div>
      </div>
    </div>
  );
}

export default Register;
