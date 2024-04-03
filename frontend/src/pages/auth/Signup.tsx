import LeftElement from "./SignupLeftElement";
import RightElement from "./RightElement";

export default function Signup() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <LeftElement />
      <div className="invisible md:visible">
        <RightElement />
      </div>
    </div>
  );
}
