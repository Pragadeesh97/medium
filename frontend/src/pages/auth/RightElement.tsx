import { Header1 } from "../../components/Header";
import { Description, Title } from "../../components/Typography";

export default function RightElement() {
  return (
    <div className="flex flex-col justify-center bg-gray-200 p-5 h-screen">
      <div className="mb-2">
        <Header1
          text={
            '"' +
            "The Customer service I received was exceptional. The support team went above and beyond to address my concerns." +
            '"'
          }
        />
      </div>
      <div>
        <Title text="Julies Winfield" />
      </div>
      <div>
        <Description text="CEO | Acne corp" />
      </div>
    </div>
  );
}
