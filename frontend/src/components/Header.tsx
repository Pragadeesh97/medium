type HeaderProps = {
  text: string;
};
export const Header1: React.FC<HeaderProps> = ({ text }) => {
  return <div className="text-black font-bold text-xl">{text}</div>;
};

export const Header2: React.FC<HeaderProps> = ({ text }) => {
  return <h2 className="text-black font-bold text-sm pb-1">{text}</h2>;
};
