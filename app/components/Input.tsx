"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        {...register(id, { required })}
        className={clsx(
          `form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
          ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#227B94] hover:ring-blue-500 
          hover:bg-blue-50 sm:text-sm sm:leading-6`,
          errors[id] && "focus:ring-[#227B94]",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      />
    </div>
  );
};
export default Input;
