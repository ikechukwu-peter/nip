import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useLayoutEffect,
} from "react";

import { Button, Form, Input } from "../../components";
import { GenericLayout } from "../../layout";
import { useAuth } from "../../hooks";
import { capitalizeRoute, validateEmail } from "../../utils";
import { useLocation } from "react-router-dom";

export const Login = () => {
  const location = useLocation().pathname;
  const { loading, login } = useAuth();
  const [state, setState] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleState = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setState(e.currentTarget.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state) {
      return setError("Email is required");
    }

    if (!validateEmail(state)) {
      return setError("Invalid email address");
    }

    await login({ email: state });
    setState("");
    setError("");
  };

  useLayoutEffect(() => {
    document.title = `Nip | ${capitalizeRoute(location)}`;
  }, []);
  return (
    <GenericLayout>
      <Form
        className="flex items-center justify-center w-full h-full p-6"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-3  w-full md:w-[50%] ">
          <h2 className="text-500 font-bold ">
            Welcome, enter your email to login
          </h2>
          <span className="text-500 text-sm">You do not have to sign up</span>
          <Input
            placeholder="Enter your Email Address"
            type="text"
            className={`w-full ${
              error ? "placeholder:text-700" : "placeholder:text-200"
            }  inline-block rounded bg-100 border-2 ${
              error ? "border-700" : "border-200"
            } p-3 text-xs font-medium lowercase leading-normal text-200 transition duration-150 ease-in-out hover:bg-100 hover:text-200`}
            value={state}
            onChange={handleState}
          />
          {error && <p className="text-700 font-semi-bold">{error}</p>}
          <Button
            type="submit"
            title={loading ? "Loading..." : "Login"}
            className="w-full  inline-block rounded bg-200 border-none p-3 text-xs font-medium uppercase leading-normal text-100 transition duration-150 ease-in-out hover:bg-800 hover:text-500"
          />
        </div>
      </Form>
    </GenericLayout>
  );
};
