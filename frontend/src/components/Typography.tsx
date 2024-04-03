type TextProps = {
  text: string;
};
export const Title: React.FC<TextProps> = ({ text }) => {
  return <div className="text-black text-base font-bold"> {text}</div>;
};

export const Description: React.FC<TextProps> = ({ text }) => {
  return <div className="text-sm text-slate-500">{text}</div>;
};

export function Body({
  text,
  doElipses = false,
}: {
  text: string;
  doElipses?: boolean;
}) {
  return (
    <p className="text-xs text-gray-600 mt-3 text-ellipsis font-thin">
      {text.length > 100 && doElipses ? text.slice(0, 150) + "..." : text}
    </p>
  );
}
