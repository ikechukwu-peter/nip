import React, { ReactElement } from "react";

export const Button = ({
  title,
  onClick,
  className,
  type,
  ...rest
}: {
  title: string | ReactElement;
  onClick?: () => void;
  className: string;
  type?: "button" | "submit" | "reset";
  [key: string]: unknown;
}) => {
  return (
    <button
      className={`${className}`}
      onClick={onClick}
      type={`${type ? type : "button"}`}
      {...rest}
    >
      {title}
    </button>
  );
};
