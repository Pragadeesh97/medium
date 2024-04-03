import { MouseEventHandler } from "react";
import { Header1 } from "../components/Header";
import { Description } from "../components/Typography";
import { Body } from "../components/Typography";

function BlogItem({
  author,
  title,
  description,
  onClick,
}: {
  author: string;
  title: string;
  description: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className="border-2 p-2 rounded mt-2 mb-2 mr-2 ml-1 hover:bg-gray-200 cursor-pointer"
      onClick={onClick}
    >
      <Description text={author} />
      <Header1 text={title} />
      <Body text={description} doElipses={true} />
    </div>
  );
}

export default BlogItem;
