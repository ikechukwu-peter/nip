import React from "react";

export const Card = ({
  title,
  Icon,
  description,
}: {
  title: string;
  Icon: React.ElementType;
  description: string;
}) => {
  return (
    <div className="px-2 py-5 relative w-full bg-900 shadow-xl rounded hover:bg-100 max-w-full">
      <div className="absolute  -top-4 left-[80%]">
        <div className="relative -left-[50%] font-extrabold  text-4xl text-200">
          <Icon />
        </div>
      </div>
      <div className="rounded-xl p-4 flex flex-col px-4">
        <h1 className="text-500 font-bold text-sm md:text-md lg:text-xl mt-[3rem]">
          {title}
        </h1>
        <p className="text-300 text-md py-4 leading-7 ">{description}</p>
      </div>
    </div>
  );
};
