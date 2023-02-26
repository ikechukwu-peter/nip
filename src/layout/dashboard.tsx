import React, { useState, useContext, useLayoutEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { CgMenuLeft } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import { Button } from "../components/button";
import { AuthenticationContext } from "../context";
import { AUTH_TYPE } from "../@types";

const routes = [
  { name: "Home", to: "/dashboard" },
  { name: "Shorten Link", to: "/dashboard/shorten" },
  { name: "My Links", to: "/dashboard/mylinks" },
];

export const DashboardLayout = () => {
  const { onLogout, email } = useContext(AuthenticationContext) as AUTH_TYPE;

  const navigate = useNavigate();

  const pathname = useLocation().pathname;

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleLogout = () => {
    onLogout();
  };

  useLayoutEffect(() => {
    if (
      sessionStorage.getItem("token") === null ||
      sessionStorage.getItem("email") === null
    ) {
      return navigate("/");
    }
  }, []);

  return (
    <div className="w-full h-full bg-100 overflow-x-hidden">
      <div className="h-[60px] md:h-[80px] bg-300 flex items-center justify-between px-3 sticky top-0 z-50">
        <div className="flex items-center">
          <h2 className="text-100 font-bold text-xl">
            <NavLink to="/dashboard">Nip</NavLink>
          </h2>
        </div>

        <div className="text-100 md:hidden">
          {open ? (
            <MdClose onClick={handleOpen} />
          ) : (
            <CgMenuLeft onClick={handleOpen} />
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full h-full  relative">
        <div className="hidden md:block bg-300 h-full w-[20%] fixed">
          <div className="md:flex gap-8 items-start w-full p-3">
            <div>
              <p className="text-100 font-light">
                {email || sessionStorage.getItem("email")}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-1  mt-3">
            {routes.map(({ name, to }) => (
              <NavLink
                key={name + to}
                to={to}
                className={({ isActive }) =>
                  isActive && pathname === to
                    ? "text-white font-thin text-sm bg-200 p-4"
                    : "text-white font-thin text-sm hover:bg-200 p-4"
                }
              >
                {name}
              </NavLink>
            ))}
            <Button
              title="Logout"
              onClick={handleLogout}
              className="text-white font-thin text-sm text-left hover:bg-200 p-4"
            />
          </div>
        </div>

        {open && (
          <div className=" md:hidden bg-400 h-full w-full fixed z-50">
            <div className="md:hidden gap-8 items-start w-full p-3">
              <div>
                <p className="text-100 font-light">
                  {email || sessionStorage.getItem("email")}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-1  mt-3">
              {routes.map(({ name, to }) => (
                <NavLink
                  key={name + to}
                  to={to}
                  onClick={handleOpen}
                  className={({ isActive }) =>
                    isActive && pathname === to
                      ? "text-white font-thin text-sm bg-200 p-4"
                      : "text-white font-thin text-sm hover:bg-200 p-4"
                  }
                >
                  {name}
                </NavLink>
              ))}
              <Button
                title="Logout"
                onClick={handleLogout}
                className="text-white font-thin text-sm text-left hover:bg-200 p-4"
              />
            </div>
          </div>
        )}

        <div className="md:w-[80%] p-3 md:px-8 md:py-6 w-full  md:ml-[10rem] lg:ml-[16rem] z-0 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
