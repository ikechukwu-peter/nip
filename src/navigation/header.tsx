import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { CgMenuLeft } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { Button } from "../components";

export const Header = () => {
  //state to hold isOpen value, default to false
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //this function toggles the isOpen property
  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50  ">
      <nav className="flex w-full items-center justify-between  bg-gradient-to-r from-200 to-800 py-2 text-100 shadow-lg hover:text-100 focus:text-100">
        <div className="flex w-full flex-wrap items-center justify-between px-6 max-w-7xl ">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-100 font-bold text-xl hover:text-300  transition duration-150 ease-in-out">
              <NavLink to="/">Nip</NavLink>
            </h2>

            <NavLink to="/login">
              <Button
                title="Login"
                className="hidden  md:block mr-2 border-0 bg-transparent p-2 text-md leading-none transition-shadow duration-150 ease-in-out hover:text-100 focus:text-100 hover:border-2 hover:rounded-full hover:border-100"
              />
            </NavLink>

            <Button
              className="mr-2 border-0 bg-transparent py-2 text-xl leading-none transition-shadow duration-150 ease-in-out hover:text-100 focus:text-100  md:hidden"
              type="button"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={toggleIsOpen}
              title={isOpen ? <MdClose /> : <CgMenuLeft />}
            />
          </div>
          <div
            className={`${
              isOpen
                ? "flex flex-col transition duration-150 ease-in-out"
                : "hidden"
            }`}
          >
            <NavLink to="/login">
              <Button
                title="Login"
                className="md:hidden mr-2 border-0 bg-transparent py-2 text-md leading-none transition-shadow duration-150 ease-in-out hover:text-100 focus:text-100 hover:border-2 hover:rounded-full hover:border-100"
              />
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};
