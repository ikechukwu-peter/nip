import React, { useLayoutEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import useSWR from "swr";
import { capitalizeRoute } from "../../utils";
import { instance } from "../../config";
import { FailedError } from "../error";
import { UILoader } from "../../components/loaders";
import { IURLTYPE } from "../../@types";
import dayjs from "dayjs";
import { NoResult } from "../../components";

export const MyLinks = () => {
  const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR("/get/all", fetcher);

  const location = useLocation().pathname;

  useLayoutEffect(() => {
    document.title = `Nip | ${capitalizeRoute(location)}`;
  }, []);

  if (error) {
    return <FailedError />;
  }

  return (
    <div className="w-full  my-4">
      {isLoading ? (
        <UILoader />
      ) : (
        <>
          <h2 className="text-2xl font-bold md:text-4xl lg:text-5xl md:font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-600 to-300">
            Your links
          </h2>

          {data?.resource?.length ? (
            <section className="flex  flex-col md:flex-row gap-2  my-10 flex-wrap ">
              {data?.resource?.map((resource: IURLTYPE) => (
                <URLS key={resource.id} {...resource} />
              ))}
            </section>
          ) : (
            <NoResult />
          )}
        </>
      )}
    </div>
  );
};

const URLS = ({
  id,
  clicks,
  createdAt,
  url,
}: {
  id: string;
  clicks: number;
  createdAt: string;
  url: string;
}) => {
  return (
    <div
      className="p-5 relative  bg-900 shadow-xl rounded hover:bg-100 max-w-full
        flex flex-col gap-4
    "
    >
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>

      <p className="text-300 text-md  leading-7  truncate ...">
        Created At: {dayjs(createdAt).format("MMM D, YYYY h:mm")}
      </p>

      <h1 className="text-400 font-bold text-sm md:text-sm lg:text-md ">
        Total Clicks: {clicks}
      </h1>
      <NavLink to={"/dashboard/" + id}>
        {" "}
        <span className=" p-2 text-sm  rounded border-2 border-200 hover:bg-200 hover:text-100 ">
          {" "}
          View More
        </span>{" "}
      </NavLink>
    </div>
  );
};
