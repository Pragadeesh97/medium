import { Hono } from "hono";

import { sign } from "hono/jwt";

import {
  signinSchema,
  signupSchema,
  createBlogSchema,
  updateBlogSchema,
} from "@pragadeesh1997/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
    prisma: any;
  };
}>();

userRouter.post("/signup", async (c) => {
  console.log("env", c.env);
  console.log("URL", c.env?.DATABASE_URL);
  const prisma = c.get("prisma");
  const body = await c.req.json();
  console.log("body", body);
  const { success } = signupSchema.safeParse(body);
  if (!success) {
    return c.json({ success: false, message: "Invalid Input" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({ token: jwt });
  } catch (e) {
    console.log(e);
    c.status(403);
    return c.json({ success: false, message: "Error while signing up" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = signinSchema.safeParse(body);
  if (!success) {
    return c.json({ success: false, message: "Invalid Input" });
  }
  try {
    const resultUser = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!resultUser) {
      return c.json({ success: false, message: "User does not exist" });
    }
    const token = await sign({ id: resultUser.id }, c.env.JWT_SECRET);

    return c.json({
      success: true,
      message: "Signed in successfully",
      data: { token: token },
    });
  } catch (e) {
    console.log("Error", e);
    return c.json({ success: false, message: "Exception occured " });
  }
});

userRouter.post("/blog", async (c) => {
  console.log("Post blog");
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = createBlogSchema.safeParse(body);
  if (!success) {
    return c.json({ success: false, message: "Invalid Input" });
  }
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
      },
    });
    return c.json({
      success: true,
      message: "Blog created successfully",
    });
  } catch (e) {
    console.log("Error occured", e);
    c.status(400);
    c.json({
      success: false,
      message: "Error occured while creating the post",
    });
  }
});

userRouter.put("/blog", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = updateBlogSchema.safeParse(body);
  if (!success) {
    return c.json({ success: false, message: "Invalid Input" });
  }
  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: body.blogId,
      },
    });
    if (!blog) {
      return c.json({ message: "Blog does not exist" });
    }
    await prisma.post.update({
      where: {
        id: body.blogId,
        authorId: c.get("userId"),
      },
      data: {
        title: body.title,
        content: body.content,
        published: true ? body.published == "true" : false,
      },
    });
    return c.json({ success: true, message: "Updated successfully" });
  } catch (e) {
    console.log("Exception occured", e);
    c.status(500);
    return c.json({ message: "Exception occured, please try later" });
  }
});

userRouter.get("/blog", async (c) => {
  const prisma = c.get("prisma");
  const blogId = c.req.query("blogId");
  console.log("blog id", blogId);
  try {
    const blog = await prisma.post.findUnique({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      where: {
        id: blogId,
      },
    });
    if (!blog) {
      c.status(400);
      return c.json("Blog does not exist");
    }
    return c.json({ data: blog });
  } catch (e) {
    console.log("Exception occured", e);
    c.status(500);
    return c.json({ message: "Exception occured, please try later" });
  }
});

userRouter.get("/blog/bulk", async (c) => {
  console.log("Bulk get", c.get("userId"));
  const prisma = c.get("prisma");
  try {
    const allPosts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
    console.log("All posts", allPosts);
    return c.json({ success: true, data: allPosts });
  } catch (e) {
    console.log("Exception occured", e);
    c.status(500);
    return c.json({ message: "Exception occured, please try later" });
  }
});
