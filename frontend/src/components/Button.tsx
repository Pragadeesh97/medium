import { MouseEventHandler } from "react";

type ButtonProps = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="bg-black text-white text-xs rounded p-2 hover:rounded hover:bg-gray-600"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
