import React, { useState, createContext, useEffect, ReactNode } from "react";
import { AUTH_TYPE, IPAYLOAD } from "../@types";
import { useAuth } from "../hooks";

export const AuthenticationContext = createContext<AUTH_TYPE | null>(null);

export const AuthenticationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { loading, login } = useAuth();

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const _email = sessionStorage.getItem("email");

    if (_email && token) {
      setEmail(_email);
    }
  }, []);

  const onLogin = async (payload: IPAYLOAD): Promise<unknown> => {
    return login(payload);
  };

  const onLogout = (): unknown => {
    sessionStorage.removeItem("token");
    return (window.location.href = "/");
  };

  return (
    <AuthenticationContext.Provider
      value={{
        email,
        setEmail,
        loading,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
