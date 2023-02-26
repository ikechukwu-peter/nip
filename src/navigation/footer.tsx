import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../components";

export const Footer = () => {
  return (
    <footer className="w-full  flex justify-center flex-col md:flex-row md:justify-between items-center text-100 bg-gradient-to-r from-800 to-200 p-6">
      <div className="flex items-center justify-center flex-col gap-3">
        <h4 className="mr-4 text-500 font-bold">Boost your links today</h4>
        <NavLink to="/login">
          <Button
            title="Get Started"
            className="inline-block  rounded-full border-2 border-100 px-6 pt-2 pb-[6px] text-xs font-bold uppercase leading-normal text-500 transition duration-150 ease-in-out hover:bg-200 hover:border-200 hover:text-100"
          />
        </NavLink>
      </div>

      <div className="p-4 text-center text-100">© Nip, 2023</div>
    </footer>
  );
};
