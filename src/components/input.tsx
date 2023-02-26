import React from "react";

export const Input = ({
  type,
  placeholder,
  className,
  ...rest
}: {
  type: string;
  placeholder: string;
  className: string;
  [key: string]: unknown;
}) => {
  return (
    <input
      {...rest}
      type={type}
      placeholder={placeholder}
      className={className}
    />
  );
};
