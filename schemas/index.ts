import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6),
});

export const CreateCategorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
});

export const CreateExamSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  subjectId: z.string(),
});

export const AnswerSchema = z.object({
  answer: z.string(),
  isCorrect: z.boolean(),
});

export const NewQuestionSchema = z.object({
  question: z.string().min(1, {
    message: "Question must be required",
  }),
  type: z.enum(["MCQ", "MRQ", "TRUE_FALSE", "SHORT_ANSWER"]),
  image: z.string().optional(),
  explanation: z.string().optional(),
  examId: z.string(),
  answers: z.array(AnswerSchema),
});

export const NewPostSchema = z.object({
  // title       String
  // slug        String   @unique
  // content     String?
  // postImage   String?
  // description String?
  // tags        String[]

  title: z.string().min(1, {
    message: "Title must be required",
  }),
  slug: z.string().min(1, {
    message: "Slug must be required",
  }),
  content: z.string().optional(),
  postImage: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
})
