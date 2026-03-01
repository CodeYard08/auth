import { useNavigate } from "react-router-dom";
import { Button, Input } from "../components";
import React, { useState } from "react";
import type { ISignUpRequestType } from "../types";
import { useSignUpMutations } from "../hooks/mutations/useSignUpMutations";

export const SignUp = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<ISignUpRequestType>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { mutate: signUpMutate } = useSignUpMutations();

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const onClickSignUp = () => {
    if (!inputs.email.trim()) {
      alert("이메일을 입력해주세요.");
    } else if (!inputs.password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    } else if (!inputs.confirmPassword.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    } else if (inputs.password !== inputs.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    signUpMutate(inputs, {
      onSuccess: () => {
        setInputs({ email: "", password: "", confirmPassword: "" });
      },
    });
  };

  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "60px auto",
        fontFamily: "monospace",
      }}
    >
      <h1
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "16px",
          borderBottom: "2px solid black",
          paddingBottom: "8px",
        }}
      >
        회원가입
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Input
          type="email"
          name="email"
          placeholder="이메일"
          value={inputs.email}
          onChange={onChangeInputs}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={inputs.password}
          onChange={onChangeInputs}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={inputs.confirmPassword}
          onChange={onChangeInputs}
        />
      </div>

      <div style={{ marginTop: "16px" }}>
        <Button variant="primary" onClick={onClickSignUp}>
          회원가입
        </Button>
      </div>

      <div
        style={{
          marginTop: "12px",
          fontSize: "12px",
          color: "#555",
          textAlign: "center",
        }}
      >
        이미 계정이 있으신가요?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          로그인
        </span>
      </div>
    </div>
  );
};
