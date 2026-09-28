import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export default function Button({
  children,
  variant = "primary",
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    padding: "10px 20px",
    borderRadius: "8px",
    fontFamily: "Poppins, Helvetica, sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "0.2s",
  };

  const variantStyle: React.CSSProperties =
    variant === "primary"
      ? {
          backgroundColor: "#FFFFFF",
          color: "#000001",
          border: "1px solid #FFFFFF",
        }
      : {
          backgroundColor: "#069494",
          color: "#ffffff",
          border: "1px solid #069494",
        };

  const disabledStyle: React.CSSProperties = disabled
    ? {
        backgroundColor: "#505D6F",
        color: "#FFFFFF",
        border: "1px solid #505D6F",
        cursor: "not-allowed",
      }
    : {};

  return (
    <button
      disabled={disabled}
      style={{ ...baseStyle, ...variantStyle, ...disabledStyle }}
      {...props}
    >
      {children}
    </button>
  );
}