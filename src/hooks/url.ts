import { ICreateShortType } from "./../@types";
import { instance } from "./../config/axios";
import { useState } from "react";

export const useUrl = () => {
  const [loading, setLoading] = useState(false);

  const getProtectedUrl = async (short: string, payload: string) => {
    try {
      setLoading(true);
      const { resource } = await (
        await instance.get(`/get/${short}/${payload}`)
      ).data;

      window.location.href = resource;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const create = async (payload: ICreateShortType) => {
    try {
      setLoading(true);
      const { resource } = await (await instance.post("/create", payload)).data;
      if (resource) {
        console.log(resource);
        return resource;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //for unauthenticated user
  const unSignCreateURL = async (originalUrl: string) => {
    try {
      setLoading(true);
      const response = await instance.post("/create/unsign", { originalUrl });
      if (response?.data) {
        return response?.data?.resource;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    unSignCreateURL,
    create,
    getProtectedUrl,
  };
};
