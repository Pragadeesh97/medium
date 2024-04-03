import { z } from "zod";

export const signupSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.optional(z.string()),
});

export const signinSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const createBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.optional(z.string()),
});

export type SignupType = z.infer<typeof signupSchema>;
export type SignInType = z.infer<typeof signinSchema>;
export type CreateBlogType = z.infer<typeof createBlogSchema>;
export type UpdateBlogType = z.infer<typeof updateBlogSchema>;
