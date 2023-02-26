import React, { useLayoutEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import dayjs from "dayjs";
import useSWR from "swr";
import { capitalizeRoute } from "../../utils";
import { instance } from "../../config";
import { FailedError } from "../error";
import { UILoader } from "../../components/loaders";
import { IURLSTYPE } from "../../@types";
import { QrCode } from "../../features";

export const Link = () => {
  const param = useParams().id;
  const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR("/find/" + param, fetcher);

  const location = useLocation().pathname;

  useLayoutEffect(() => {
    document.title = `Nip | ${capitalizeRoute(location)}`;
  }, []);

  console.log(data, "DARAA");

  const [state] = useState<IURLSTYPE>(data.resource);

  if (error) {
    return <FailedError />;
  }

  return (
    <div className="w-full  my-4">
      {isLoading ? (
        <UILoader />
      ) : (
        <div className="flex flex-col justify-between md:flex-row bg-900 shadow-xl rounded hover:bg-100 max-w-full">
          <div className="p-5 relative   flex flex-col gap-4 ">
            <a href={state.shortUrl} target="_blank" rel="noreferrer">
              Short Link: {state.shortUrl}
            </a>

            <p className="text-300 text-md  leading-7  truncate ...">
              Created At: {dayjs(state.createdAt).format("MMM D, YYYY h:mm")}
            </p>
            <p className="text-300 text-md  leading-7  truncate ...">
              Expires At: {dayjs(state.expiresAt).format("MMM D, YYYY h:mm")}
            </p>

            <h1 className="text-400 font-bold text-sm md:text-sm lg:text-md ">
              Total Clicks: {state.clicks}
            </h1>
          </div>

          <QrCode qr={state.qr} />
        </div>
      )}
    </div>
  );
};
