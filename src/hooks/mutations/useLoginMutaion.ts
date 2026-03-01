import { useMutation } from "@tanstack/react-query";
import { login } from "../../apis";
import type { ILoginRequestType } from "../../types";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: ILoginRequestType) => login(data),
    onSuccess: (data) => {
      alert("로그인에 성공하셨습니다!");
      console.log(data);
      // localStorage.setItem("", );
    },
  });
};
