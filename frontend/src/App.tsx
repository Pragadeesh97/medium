import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import BlogView from "./pages/BlogView";
import CreateBlog from "./pages/CreateBlog";

const Signin = React.lazy(() => import("./pages/auth/Signin"));
const Signup = React.lazy(() => import("./pages/auth/Signup"));
const Blog = React.lazy(() => import("./pages/Blog"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogView />} />
          <Route path="/create" element={<CreateBlog />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
