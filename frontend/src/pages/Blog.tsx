import axios from "axios";
import { useEffect, useState } from "react";
import { Header2 } from "../components/Header";
import BlogItem from "./BlogItem";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";

type Author = {
  id: string;
  email: string;
  name: string;
};

export type BlogType = {
  id: string;
  title: string;
  content: string;
  author: Author;
};
export default function Blog() {
  const token = localStorage.getItem("token");
  const [blogs, setBlogs] = useState<BlogType[]>();
  async function getBlogs() {
    try {
      const res = await axios.get(
        "https://medium-backend.pragadeeshsasi.workers.dev/api/v1/user/blog/bulk",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        console.log("blogs, ", res.data);
        setBlogs(res.data.data);
      }
    } catch (e) {
      console.log("Error while fetching the blogs", e);
    }
  }
  useEffect(() => {
    getBlogs();
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <AppBar />
      <div className="mt-5 shadow mb-3 pl-2">
        <Header2 text="Your blogs to read..." />
      </div>
      {blogs ? (
        blogs.map((blog) => {
          return (
            <BlogItem
              key={blog.id}
              author={blog?.author?.name}
              title={blog.title}
              description={blog.content}
              onClick={() => {
                console.log("Blog item clicked");
                navigate(`/blog/${blog.id}`);
              }}
            />
          );
        })
      ) : (
        <ListSkeleton />
      )}
    </>
  );
}

function ListSkeleton() {
  return (
    <div
      role="status"
      className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse w-full"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
