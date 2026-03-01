import type { ILoginRequestType } from "../../types";
import { apiClient } from "../axios";

export const login = async (data: ILoginRequestType) => {
  const response = await apiClient.post("/api/auth/login", data);

  if (!response.data) {
    throw new Error();
  }

  return response.data;
};
