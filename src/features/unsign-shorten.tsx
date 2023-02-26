import React, { FormEvent, FC, ChangeEvent, useState } from "react";
import { Button, CopyButton, Form, Input } from "../components";
import { useUrl } from "../hooks";
import { validateURL } from "../utils";

export const UnsignShorten: FC = () => {
  const { loading, unSignCreateURL } = useUrl();
  const [data, setData] = useState<{ url: string }>({ url: "" });
  const [state, setState] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleState = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setData({ url: "" });
    setState(e.currentTarget.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state) {
      return setError("original url is required");
    }

    //check if it begins with http
    const url = state.startsWith("http") ? state : `https://${state}`;

    if (!validateURL(url)) return setError("Invalid url");

    const result: { url: string } = await unSignCreateURL(url);
    setData(result);
    setError("");
  };

  return (
    <div className="my-8">
      <div className="bg-300 p-4 rounded">
        <Form
          onSubmit={onSubmit}
          className="flex flex-col md:flex-row gap-3 justify-between items-start"
        >
          <div className="w-full md:w-[95%]">
            <Input
              placeholder="Shorten a link here..."
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
          </div>
          <Button
            type="submit"
            title={loading ? "Creating..." : "Shorten It!"}
            className="w-full md:w-[20%] inline-block rounded bg-200 border-none p-3 text-xs font-medium uppercase leading-normal text-100 transition duration-150 ease-in-out hover:bg-800 hover:text-500"
          />
        </Form>
      </div>

      {data?.url && (
        <div className="w-full bg-500 rounded p-3 shadow-xl hover:bg-600 mt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="w-full text-100 font-bold text-sm">{state}</p>
          <div className="flex flex-col justify-start md:flex-row  items-center gap-4 w-full md:justify-end  text-clip truncate ...">
            <a
              href={data.url}
              className="w-full md:w-[100%] text-200 font-bold text-sm"
            >
              {data.url}
            </a>
            <CopyButton
              url={data.url}
              className=" w-full md:w-auto inline-block rounded bg-200 border-none p-3 px-6 text-xs font-medium uppercase leading-normal text-100 transition duration-150 ease-in-out hover:bg-800 hover:text-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};
