import { useNavigate } from "react-router-dom";
import { Button, Input } from "../components";

export const Login = () => {
  const navigate = useNavigate();

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
        로그인
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Input type="email" placeholder="이메일" />
        <Input type="password" placeholder="비밀번호" />
      </div>

      <div style={{ marginTop: "16px" }}>
        <Button variant="primary">로그인</Button>
      </div>

      <div
        style={{
          marginTop: "12px",
          fontSize: "12px",
          color: "#555",
          textAlign: "center",
        }}
      >
        계정이 없으신가요?{" "}
        <span
          onClick={() => navigate("/signup")}
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          회원가입
        </span>
      </div>
    </div>
  );
};
