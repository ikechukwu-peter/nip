import React, { ReactNode, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer, Header } from "../navigation";

export const GenericLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="flex flex-col h-screen relative">
      <div className="grow bg-100 z-10 relative">
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
};
