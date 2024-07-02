import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type CustomInputProps = {
  label: string;
  className?: string;
  message?: string | undefined;
} & ComponentPropsWithoutRef<"input">;

const CustomInput = ({
  className,
  label,
  message,
  ...props
}: CustomInputProps) => {
  return (
    <div className={className}>
      <label htmlFor={props.id} className="text-sm font-medium text-[#344054]">
        {label}
      </label>
      <input
        className={twMerge(
          "mt-[6px] w-full rounded-lg border-[1px] border-slate-100 px-[14px] py-[10px] text-[16px] outline-none",
        )}
        {...props}
      />
      {message && <p className="mt-1 text-sm text-red-300">{message}</p>}
    </div>
  );
};

export default CustomInput;
