import React, { useState } from "react";
import Button from "../../components/form/Button";
import InputField from "../../components/form/InputField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { firebaseApp } from "../../firebase-config";
import { setCookie } from "cookies-next";

function Login() {
  const router = useRouter();

  const initialState = {
    email: "",
    password: "",
  };
  const [loginForm, setLoginForm] = useState(initialState);
  const [errorField, setErrorField] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isRequest, setIsRequest] = useState(false);

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
    return Object.values(loginForm).some((el) => !el);
  };

  // onchange
  const onChange = (e, key) => {
    setLoginForm({ ...loginForm, [key]: e.target.value });
    setErrorField({ ...errorField, [key]: "" });
    setErrorMessage(null);
  };

  // submit
  const submit = (e) => {
    e.preventDefault();
    if (isError()) {
      errorHandlingFieldSubmit();
    } else {
      signIn();
    }
  };

  const signIn = () => {
    const auth = getAuth(firebaseApp);
    const { email, password } = loginForm;
    setIsRequest(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setCookie("user", JSON.stringify(user));
      })
      .catch((error) => {
        setErrorMessage(error.code);
      })
      .finally(() => {
        router.push("/");
        localStorage.removeItem("datas");
        localStorage.removeItem("activeQuestionIndex");
        setIsRequest(false);
      });
  };

  // redirect
  const redirect = () => {
    router.push("/auth/register");
  };
  return (
    <form
      onSubmit={submit}
      className="mt-6 flex gap-4 flex-col items-center justify-center text-left"
    >
      <p className="text-red-500">{errorMessage}</p>

      <div className="justify-end flex gap-4 flex-col gap-4">
        {Object.keys(loginForm).map((key) => {
          return (
            <InputField
              errorMessage={errorField[key]}
              value={loginForm[key]}
              type={key === "password" ? "password" : "text"}
              key={key}
              label={key}
              onChange={onChange}
            />
          );
        })}
        {/* <InputField label="Password" /> */}
        <div className="flex justify-end gap-4 mt-2">
          <Button label="Register Page" onClick={redirect} disabled={isRequest} />
          <Button label="Submit" type="submit" disabled={isRequest} />
        </div>
      </div>
    </form>
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

export default Login;
