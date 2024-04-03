import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { userRouter } from "../routes/user";
import { booksRouter } from "../routes/book";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: any;
  };
}>();

app.use("/*", cors());

app.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
});

app.use("/api/v1/user/blog/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(403);
    return c.json({ message: "Unauthorized user" });
  }
  const token = jwt && jwt.split(" ")[1];
  if (!token) {
    c.status(403);
    return c.json({ message: "Unauthorized user" });
  }
  const payload = await verify(token, c.env.JWT_SECRET);
  //@ts-ignore
  c.set("userId", payload?.id);
  await next();
});

app.get("/", (c) => {
  return c.text("Medium backend!");
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/books", booksRouter);
export default app;
