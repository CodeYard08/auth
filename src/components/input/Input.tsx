import type React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: "text" | "password" | "email";
};

export const Input = ({ placeholder, type = "text", ...props }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...props}
      style={{
        width: "100%",
        padding: "10px 8px",
        border: "1px solid black",
        outline: "none",
        fontSize: "14px",
        fontFamily: "monospace",
        boxSizing: "border-box",
      }}
    />
  );
};
