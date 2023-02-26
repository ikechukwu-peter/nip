import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useLayoutEffect,
} from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input } from "../../components";
import { useUrl } from "../../hooks";
import { GenericLayout } from "../../layout";

export const Verify = () => {
  const params = useParams().url;
  const { loading, getProtectedUrl } = useUrl();

  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleState = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setPassword(e.currentTarget.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      return setError("Password is required");
    }

    console.log(password);
    await getProtectedUrl(params as string, password);
    setPassword("");
    setError("");
  };

  useLayoutEffect(() => {
    document.title = `Nip | Verification`;
  }, []);
  return (
    <GenericLayout>
      <Form
        className="flex items-center justify-center w-full h-full p-6"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-3  w-full md:w-[50%] ">
          <h2 className="text-500 font-bold ">
            This URL is password protected
          </h2>
          <Input
            placeholder="Enter the password to access"
            type="text"
            className={`w-full ${
              error ? "placeholder:text-700" : "placeholder:text-200"
            }  inline-block rounded bg-100 border-2 ${
              error ? "border-700" : "border-200"
            } p-3 text-xs font-medium lowercase leading-normal text-200 transition duration-150 ease-in-out hover:bg-100 hover:text-200`}
            value={password}
            onChange={handleState}
          />
          {error && <p className="text-700 font-semi-bold">{error}</p>}
          <Button
            type="submit"
            title={loading ? "Validating..." : "Access"}
            className="w-full  inline-block rounded bg-200 border-none p-3 text-xs font-medium uppercase leading-normal text-100 transition duration-150 ease-in-out hover:bg-800 hover:text-500"
          />
        </div>
      </Form>
    </GenericLayout>
  );
};
