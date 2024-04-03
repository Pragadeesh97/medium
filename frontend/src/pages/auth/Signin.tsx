import RightElement from "./RightElement";
import SigninLeftElement from "./SigninLeftElement";

export default function Signin() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <SigninLeftElement />
      <div className="invisible md:visible">
        <RightElement />
      </div>
    </div>
  );
}
