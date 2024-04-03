import axios from "axios";
import Button from "../../components/Button";
import { Header1, Header2 } from "../../components/Header";
import Input from "../../components/Input";
import { Description } from "../../components/Typography";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";

export default function LeftElement() {
  const [signup, setSignup] = useImmer({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  async function onSubmit() {
    try {
      const res = await axios.post(
        "https://medium-backend.pragadeeshsasi.workers.dev/api/v1/user/signup",
        {
          email: signup.email,
          password: signup.password,
          name: signup.name,
        }
      );
      console.log("Signup done", res.data);
      if (res.data) {
        localStorage.setItem("token", res.data.token);
      }
    } catch (e) {
      console.log("Error while signingup", e);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-2">
        <div>
          <div className="flex justify-center">
            <Header1 text="Create an account" />
          </div>
          <div className="flex items-baseline gap-1">
            <Description text="Already have an account?" />
            <div
              className="text-sm text-slate-500 underline cursor-pointer"
              onClick={() => {
                console.log("Login clicked");
                navigate("/signin");
              }}
            >
              Signin
            </div>
          </div>
        </div>
        <div>
          <Header2 text="Username" />
          <Input
            placeholder="Enter your name"
            onChange={(e) => {
              setSignup((obj) => {
                obj.name = e.target.value;
              });
            }}
          />
        </div>
        <div>
          <Header2 text="Email" />
          <Input
            placeholder="user@domain.com"
            onChange={(e) => {
              setSignup((obj) => {
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
              setSignup((obj) => {
                obj.password = e.target.value;
              });
            }}
            type="password"
          />
        </div>
        <div className="mt-2">
          <Button onClick={onSubmit} text="Submit"></Button>
        </div>
      </div>
    </div>
  );
}
