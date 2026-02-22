type InputProps = {
  placeholder?: string;
  type?: "text" | "password" | "email";
};

export const Input = ({ placeholder, type = "text" }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
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
