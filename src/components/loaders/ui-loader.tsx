import React from "react";
import "./ui-style.css";

export const UILoader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-100 touch-none">
      <div className="pulsar"></div>
    </div>
  );
};
