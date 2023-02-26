import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Card } from "../../components";
import { GenericLayout } from "../../layout";
import hello from "../../assets/hello.svg";
import { UnsignShorten } from "../../features";
import { features } from "../../data";

export const Home = () => {
  return (
    <GenericLayout>
      <div className="h-full w-full px-6">
        <div className="flex  md:justify-between item-center py-10 flex-col-reverse md:flex-row gap-2">
          <div className="flex flex-col gap-3 w-full items-center md:w-half  md:items-start">
            <h2 className="text-4xl font-bold md:text-6xl lg:text-7xl md:font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-600 to-300">
              More than just <br /> shorter links
            </h2>

            <p className="hidden md:block text-sm md:text-lg font-semi-bold">
              {`Build your brand’s recognition and get detailed `}
              <br />
              {`insights on how your links are performing`}
            </p>
            <p className="text-sm text-center md:text-left md:text-lg font-semi-bold md:hidden ">
              {`Build your brand’s recognition and get detailed  insights on how your links are performing`}
            </p>
            <NavLink to="/login">
              <Button
                title="Get Started"
                className="inline-block rounded-full bg-200 border-none px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-100 transition duration-150 ease-in-out hover:bg-800 hover:text-500"
              />
            </NavLink>
          </div>

          <div className="w-full md:w-half">
            <img src={hello} alt="" className="w-full" />
          </div>
        </div>

        <UnsignShorten />

        <div className="my-4">
          <h2 className=" text-center text-400 capitalize text-3xl font-bold md:text-4xl lg:text-5xl md:font-extrabold my-4">
            Superpowered url
          </h2>
          <p className="text-center text-sm text-300 font-bold">
            Track how your links are performing across the web with our advanced
            statistics dashboard.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10  lg:gap-10 align-start my-10">
            {features.map(({ title, description, Icon }) => (
              <Card
                key={title}
                title={title}
                description={description}
                Icon={Icon}
              />
            ))}
          </section>
        </div>
      </div>
    </GenericLayout>
  );
};
