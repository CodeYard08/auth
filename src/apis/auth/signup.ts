import type { ISignUpRequestType } from "../../types";
import { apiClient } from "../axios";

export const signUp = async (data: ISignUpRequestType) => {
  const response = await apiClient.post("/api/auth/signup", data);
  if (!response.data) {
    throw new Error();
  }

  return response.data;
};
