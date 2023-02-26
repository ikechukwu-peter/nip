import { IPAYLOAD } from "../@types";
import { instance } from "./../config/axios";
import { useState } from "react";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = async (payload: IPAYLOAD) => {
    try {
      setLoading(true);
      await instance.post("/auth/login", payload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
  };
};
