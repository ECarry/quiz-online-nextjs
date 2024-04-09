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
  image: z.string().optional(),
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
