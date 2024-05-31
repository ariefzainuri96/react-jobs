import { twMerge } from "tailwind-merge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type SelectItem = {
  value: string;
  content: string;
};

type CustomSelectProps = {
  label: string;
  data: SelectItem[];
  className?: string;
  placeholder?: string;
  onValueChange: (e: string) => void;
};

const CustomSelect = ({
  label,
  className,
  data,
  placeholder = "Select",
  onValueChange,
}: CustomSelectProps) => {
  return (
    <div className={twMerge("flex flex-col", className)}>
      <label className="mb-2">{label}</label>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-full rounded-md border-[1px] border-slate-100 py-2">
          <SelectValue className="" placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {data.map((element, index) => {
            return (
              <SelectItem key={index} value={element.value}>
                {element.content}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
