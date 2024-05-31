import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type CustomAreaProps = {
  label: string;
  placeholder?: string;
  name?: string;
  enable?: boolean;
  className?: string;
} & ComponentProps<"textarea">;

const CustomArea = ({
  className,
  label,
  placeholder,
  name,
  enable = true,
  ...props
}: CustomAreaProps) => {
  return (
    <div className={className}>
      <p className="text-sm font-medium text-[#344054]">{label}</p>
      <textarea
        disabled={!enable}
        placeholder={placeholder}
        name={name}
        className={twMerge(
          "mt-[6px] w-full rounded-lg border-[1px] border-slate-100 px-[14px] py-[10px] text-[16px] outline-none",
          enable ? "text-[#101828]" : "text-[#667085]",
        )}
        {...props}
      />
    </div>
  );
};

export default CustomArea;
