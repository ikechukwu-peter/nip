import React, {
  useLayoutEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { useLocation } from "react-router-dom";

import { ICreateShortResponseType, ICreateShortType } from "../../@types";
import { capitalizeRoute, validateURL } from "../../utils";
import { Button, CopyButton, Form, Input } from "../../components";
import { useUrl } from "../../hooks";
import { QrCode } from "../../features";

export const Shorten = () => {
  const { loading, create } = useUrl();
  const location = useLocation().pathname;

  useLayoutEffect(() => {
    document.title = `Nip | ${capitalizeRoute(location)}`;
  }, []);

  const [state, setState] = useState<ICreateShortType>({
    originalUrl: "",
    customUrl: "",
    password: "",
    expiresAt: "",
  });

  const [error, setError] = useState<string>("");

  //Server response
  const [data, setData] = useState<ICreateShortResponseType>({
    url: "",
    qr: "",
  });

  const handleState = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setError("");
    setState({ ...state, [name]: value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //check if it begins with http
    const url = state.originalUrl.startsWith("http")
      ? state.originalUrl
      : `https://${state.originalUrl}`;

    if (!state.originalUrl) {
      return setError("Original URL is required");
    }
    if (!validateURL(url)) {
      return setError("Invalid url " + state.originalUrl);
    }
    console.log(state);
    //remove user url, I would send the formatted url to the serve
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { originalUrl, ...rest } = state;
    const result = await create({ ...rest, originalUrl: url });
    setData(result);
    setState({ originalUrl: "", customUrl: "", password: "", expiresAt: "" });
    setError("");
  };

  return (
    <div className="w-full h-full my-4">
      <h2 className="text-300 font-bold text-xl   mt- [3rem] my-4">
        Create short links in a few second
      </h2>

      <Form onSubmit={onSubmit}>
        <div className="flex flex-col md:flex-row gap-3 py-2">
          <div className="w-full">
            <label htmlFor="date" className="text-300 font-semibold text-sm">
              <span className="text-700 ">*</span> Original URL [the link you
              want to shorten]
            </label>
            <Input
              placeholder="Original URL"
              type="text"
              className={`w-full ${
                error ? "placeholder:text-700" : "placeholder:text-200"
              }  inline-block rounded bg-100 border-2 ${
                error ? "border-700" : "border-200"
              } p-3 text-xs font-medium lowercase leading-normal text-200 transition duration-150 ease-in-out hover:bg-100 hover:text-200`}
              value={state.originalUrl}
              onChange={handleState}
              name="originalUrl"
            />
            {error && <p className="text-700 font-semi-bold">{error}</p>}
          </div>

          <div className="w-full">
            <label htmlFor="date" className="text-300 font-semibold text-sm">
              Custom name [The name you would like to customize to]
            </label>
            <Input
              placeholder="(Optional) Custom Name"
              type="text"
              className={`w-full placeholder:text-200  inline-block rounded bg-100 border-2 border-200 p-3 text-xs font-medium lowercase leading-normal text-200 transition duration-150 ease-in-out hover:bg-100 hover:text-200`}
              value={state.customUrl}
              onChange={handleState}
              name="customUrl"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 py-2">
          <div className="w-full">
            <label
              htmlFor="password"
              className="text-300 font-semibold text-sm"
            >
              (Optional) Password
            </label>
            <Input
              id="passwrd"
              placeholder="(Optional) Add a Password"
              type="password"
              className={`w-full "placeholder:text-200"
              inline-block rounded bg-100 border-2  "border-200"
             p-3 text-xs font-medium lowercase leading-normal text-200 transition duration-150 ease-in-out hover:bg-100 hover:text-200`}
              value={state.password}
              onChange={handleState}
              name="password"
            />
          </div>
          <div className="w-full">
            <label htmlFor="date" className="text-300 font-semibold text-sm">
              (Optional) Date [Date for the link to expires, defaults to 30
              days]
            </label>
            <Input
              id="date"
              placeholder="(Optional) Expires At"
              type="datetime-local"
              className={`w-full placeholder:text-200  inline-block rounded bg-100 border-2 border-200 p-3 text-xs font-medium lowercase leading-normal text-200 transition duration-150 ease-in-out hover:bg-100 hover:text-200`}
              value={state.expiresAt}
              onChange={handleState}
              name="expiresAt"
            />
          </div>
        </div>

        <Button
          type="submit"
          title={loading ? "Shortening..." : "Shorten"}
          className="w-full md:w-[50%]  inline-block rounded bg-200 border-none p-3 text-xs font-medium uppercase leading-normal text-100 transition duration-150 ease-in-out hover:bg-800 hover:text-500"
        />
      </Form>

      {/* DATA PRESENTATION */}

      {data?.url && (
        <div className="mt-10 truncate ...">
          <h2 className="text-300 font-bold text-xl   mt- [3rem] my-4">
            Result
          </h2>
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
          <QrCode qr={data.qr} />
        </div>
      )}
    </div>
  );
};
