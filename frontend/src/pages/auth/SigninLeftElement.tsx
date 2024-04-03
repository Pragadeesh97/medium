import { Header1, Header2 } from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useImmer } from "use-immer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SignInType } from "@pragadeesh1997/medium-common";
import { Description } from "../../components/Typography";

const SigninLeftElement = () => {
  const [signin, setSignin] = useImmer<SignInType>({ email: "", password: "" });
  const navigate = useNavigate();
  async function handleOnSubmit() {
    try {
      const res = await axios.post(
        "https://medium-backend.pragadeeshsasi.workers.dev/api/v1/user/signin",
        {
          email: signin.email,
          password: signin.password,
        }
      );
      console.log("signin done", res.data.data);
      if (res.data) {
        localStorage.setItem("token", res.data.data.token);
        navigate("/blog");
      }
    } catch (e) {
      console.log("Error while signingup", e);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-2">
        <div className="flex justify-center">
          <Header1 text="Signin to your account" />
        </div>
        <div className="flex items-baseline gap-1">
          <Description text="Don't have an account?" />
          <div
            className="text-sm text-slate-500 underline cursor-pointer"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </div>
        </div>
        <div>
          <Header2 text="Email" />
          <Input
            placeholder="user@domain.com"
            onChange={(e) => {
              setSignin((obj) => {
                obj.email = e.target.value;
              });
            }}
          />
        </div>
        <div>
          <Header2 text="Password" />
          <Input
            placeholder="Enter your password"
            onChange={(e) => {
              setSignin((obj) => {
                obj.password = e.target.value;
              });
            }}
            type="password"
          />
        </div>
        <div className="mt-2">
          <Button onClick={handleOnSubmit} text="Signin"></Button>
        </div>
      </div>
    </div>
  );
};

export default SigninLeftElement;
