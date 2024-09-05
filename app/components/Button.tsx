"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullwidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullwidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        ` flex justify-center px-3 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
        disabled && "opacity-50 cursor-default",
        fullwidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-[#227B94] hover:bg-[#227B94] focus-visible:outline-[#227B94]",
        !secondary &&
          !danger &&
          "bg-[#227B94] hover:bg-[#227B94] focus-visible:outline-[#227B94]"
      )}
    >
      {children}
    </button>
  );
};
export default Button;
