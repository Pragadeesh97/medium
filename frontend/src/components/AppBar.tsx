import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import Button from "./Button";

function AppBar() {
  const navigate = useNavigate();
  return (
    <div className="py-2 p-3 flex justify-between border-b items-center">
      <Link to="/blog">
        <div>Medium</div>
      </Link>
      <div className="flex justify-center items-center gap-3">
        <Button text="Create Blog" onClick={() => navigate("/create")} />
        <Avatar name="Anonymous" />
      </div>
    </div>
  );
}

export default AppBar;
