import { Hono } from "hono";

export const booksRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
}>();

booksRouter.get("/test", async (c) => {
  console.log("Books route testing");
  return c.text("Test boooks router");
});
