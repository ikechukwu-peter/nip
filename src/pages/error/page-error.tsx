import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { GenericLayout } from "../../layout";

export const PageError = () => {
  const navigate = useNavigate();
  const error: unknown = useRouteError();
  console.error(error);
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <GenericLayout>
      <div className=" flex items-center justify-center flex-col bg-100 w-full h-full p-6 gap-3">
        <h1 className="text-lg font-extrabold text-200">Oops!</h1>
        <p className="text-300 ">Sorry, an unexpected error has occurred.</p>
        {/* <p className="text-500 text-lg ">
        <i className="underline">{error.statusText || error.message}</i>
      </p> */}
        <Button
          onClick={handleNavigate}
          title="Return to Home"
          className="inline-block rounded bg-200 border-none p-3 text-xs font-medium uppercase leading-normal text-100 transition duration-150 ease-in-out hover:bg-800 hover:text-500"
        />
      </div>
    </GenericLayout>
  );
};
