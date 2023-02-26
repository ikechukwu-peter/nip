import React from "react";

export const FailedError = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <h2 className="text-700 font-bold text-sm md:text-sm lg:text-md mt- [3rem] my-4">
        An error occured while loading your data, please refresh the page
      </h2>
    </div>
  );
};
