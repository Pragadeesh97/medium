import { useImmer } from "use-immer";
import AppBar from "../components/AppBar";
import Input from "../components/Input";
import { CreateBlogType } from "@pragadeesh1997/medium-common";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [blogData, setBlogData] = useImmer<CreateBlogType>({
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  return (
    <>
      <AppBar />
      <div className="flex flex-col gap-5 justify-center max-w-screen-lg px-5 py-10">
        <div className="mt-5">
          <Input
            placeholder="Title"
            onChange={(e) => {
              setBlogData((data: CreateBlogType) => {
                data.title = e.target.value;
              });
            }}
          />
        </div>
        <div>
          <textarea
            id="message"
            rows={10}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:bordered focus:border-black"
            placeholder="Write your article here..."
            onChange={(e) => {
              setBlogData((data: CreateBlogType) => {
                data.content = e.target.value;
              });
            }}
          ></textarea>
        </div>
        <div>
          <Button
            text="Publish"
            onClick={async () => {
              try {
                const res = await axios.post(
                  "https://medium-backend.pragadeeshsasi.workers.dev/api/v1/user/blog",
                  {
                    title: blogData.title,
                    content: blogData.content,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                if (res) {
                  navigate("/blog");
                }
              } catch (e) {
                console.log("Exception occured while creating the blog", e);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

export default CreateBlog;
