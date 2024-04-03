import { useParams } from "react-router-dom";
import { Header1, Header2 } from "../components/Header";
import { Body, Description } from "../components/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "../components/AppBar";
import { BlogType } from "./Blog";

export default function BlogView() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState<BlogType>();
  async function getBlog() {
    const res = await axios(
      `https://medium-backend.pragadeeshsasi.workers.dev/api/v1/user/blog?blogId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res) {
      console.log("response blog data", res.data);
      setBlogData(res.data.data);
    }
  }
  useEffect(() => {
    if (id) {
      getBlog();
    }
  }, [id]);
  return blogData ? (
    <>
      <AppBar />
      <div className="grid grid-cols-3 h-screen pt-20 pl-10">
        <div className="col-span-2 ">
          <Content title={blogData.title} content={blogData.content} />
        </div>
        <div className="col-span-1 pl-5">
          <Author name="Pragadeesh" description="Full stack developer" />
        </div>
      </div>
    </>
  ) : (
    <>
      <AppBar />
      <div className="p-10">
        <Skeleton />
      </div>
    </>
  );
}

function Author({ name, description }: { name: string; description: string }) {
  return (
    <>
      <Header2 text="Author" />
      <div className="mt-4 mb-1">
        <Header1 text={name} />
      </div>
      <Description text={description} />
    </>
  );
}

function Content({ title, content }: { title: string; content: string }) {
  return (
    <>
      <Header1 text={title} />
      <Body text={content} />
    </>
  );
}

function Skeleton() {
  return (
    <div role="status" className=" animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
