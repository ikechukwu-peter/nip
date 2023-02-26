import React, { useState, useRef, useEffect } from "react";
import { Button } from "./button";

export const CopyButton = ({
  url,
  className,
}: {
  url: string;
  className: string;
}) => {
  const timeoutRef = useRef<number>();
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setCopySuccess(false), 2000);

    //clear timeout ref
    return () => clearTimeout(timeoutRef.current);
  }, [copySuccess]);

  // copy to clipboard function
  const copyToClipBoard = async (payload: string) => {
    try {
      await navigator.clipboard.writeText(payload);
      setCopySuccess((prev) => !prev);
    } catch (err) {
      setCopySuccess((prev) => !prev);
    }
  };

  return (
    <>
      <Button
        title={copySuccess ? "Copied" : "Copy"}
        onClick={() => copyToClipBoard(url)}
        className={`${className}`}
        disabled={copySuccess}
      />
    </>
  );
};
