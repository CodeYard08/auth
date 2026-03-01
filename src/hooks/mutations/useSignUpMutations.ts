import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../../apis";
import type { ISignUpRequestType } from "../../types";

export const useSignUpMutations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ISignUpRequestType) => signUp(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      alert("회원가입에 성공하셨습니다!");
    },
  });
};
