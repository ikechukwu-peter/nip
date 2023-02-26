import React, { useContext, useLayoutEffect } from "react";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  NavLink,
} from "react-router-dom";
import useSWR from "swr";
import jwtDecode from "@nitra/jwt-decode";
import { AuthenticationContext } from "../../context";
import { AUTH_TYPE } from "../../@types";
import { capitalizeRoute } from "../../utils";
import { AnalyticsChart } from "../../components/chart";
import { instance } from "../../config";
import { UILoader } from "../../components/loaders";
import { FailedError } from "../error";

export const Account = () => {
  const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR("/stats", fetcher);
  const { setEmail } = useContext(AuthenticationContext) as AUTH_TYPE;
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  useLayoutEffect(() => {
    document.title = `Nip | ${capitalizeRoute(location)}`;
    const token = params.get("authKey") as string;
    const resp = jwtDecode(token) as { email: string };
    if (resp.email && token) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("email", resp?.email);
      setEmail(resp?.email);
      navigate("/dashboard");
    }
  }, []);

  if (error) {
    return <FailedError />;
  }

  return (
    <div className="w-full h-full my-4">
      {isLoading ? (
        <UILoader />
      ) : (
        <>
          {!!data?.resource?.urls?.urls?.length && (
            <>
              <h2 className="text-700 font-bold text-sm md:text-sm lg:text-md mt- [3rem] my-4">
                You do not have any link or no one has clicked on your links
                yet!
              </h2>
              <NavLink to="/dashboard/shorten">
                <span className="font-bold text-md">
                  Click here to shorten your first link
                </span>
              </NavLink>
            </>
          )}
          <div className="my-2 md:my-4">
            <AnalyticsChart
              labels={data?.resource.urls.map(
                (d: { urls: string; clicks: number }) => d.urls
              )}
              data={data?.resource.urls.map(
                (c: { urls: string; clicks: number }) => c.clicks
              )}
            />
          </div>
          <section className="flex flex-wrap flex-col gap-2 align-start z-0 my-10 truncate ...">
            <div className="px-2 py-5 relative w-full bg-900 shadow-xl rounded hover:bg-100 max-w-full">
              <div className="rounded-xl  flex flex-col md:flex-row items-start md:items-center justify-between p-3 ">
                <h1 className="text-400 font-bold text-sm md:text-sm lg:text-md mt- [3rem]">
                  Total Clicks
                </h1>
                <p className="text-300 text-md pt-2 leading-7  truncate ...">
                  {data?.resource?.totalClicks}
                </p>
              </div>
              {data?.resource?.highestClicked !== "nil" && (
                <div className="rounded-xl  flex flex-col md:flex-row items-start md:items-center justify-between p-3 ">
                  <h1 className="text-400 font-bold text-sm md:text-sm lg:text-md mt- [3rem]">
                    Highest Clicked
                  </h1>
                  <div className="flex flex-col gap-2">
                    <p className="text-300 text-md pt-2 leading-7  truncate ...">
                      {data?.resource?.highestClicked}
                    </p>
                    <p className="text-300 text-md pt-2 leading-7  truncate ...">
                      Number of times visited: {data?.resource?.highestClicks}
                    </p>
                  </div>
                </div>
              )}
              {data?.resource?.lowestClicked !== "nil" && (
                <div className="rounded-xl  flex flex-col md:flex-row items-start md:items-center justify-between p-3 ">
                  <h1 className="text-400 font-bold text-sm md:text-sm lg:text-md mt- [3rem]">
                    Lowest Clicked
                  </h1>
                  <div className="flex flex-col gap-2">
                    <p className="text-300 text-md pt-2 leading-7  truncate ...">
                      {data?.resource?.lowestClicked}
                    </p>
                    <p className="text-300 text-md pt-2 leading-7  truncate ...">
                      Number of times visited: {data?.resource?.lowestClicks}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
