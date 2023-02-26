import React from "react";

export const NoResult = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <h2 className="text-200 font-bold text-sm md:text-sm lg:text-md mt- [3rem] my-4">
        It looks like you have no data yet as nothing was found.
      </h2>
    </div>
  );
};
