import { ChangeEventHandler } from "react";

type InputPropsType = {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
};

const Input: React.FC<InputPropsType> = ({
  placeholder,
  onChange,
  type = "text",
}) => {
  return (
    <input
      className="text-black p-1 w-full rounded border  text-sm border-gray-300 focus:outline-none focus:border focus:border-black"
      placeholder={placeholder}
      onChange={onChange}
      type={type}
    />
  );
};
export default Input;
