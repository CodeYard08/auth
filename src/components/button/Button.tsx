type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export const Button = ({
  onClick,
  children,
  variant = "secondary",
}: ButtonProps) => {
  const isPrimary = variant === "primary";

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "10px 16px",
        border: "1px solid black",
        background: isPrimary ? "black" : "white",
        color: isPrimary ? "white" : "black",
        cursor: "pointer",
        fontSize: "14px",
        fontFamily: "monospace",
      }}
    >
      {children}
    </button>
  );
};
