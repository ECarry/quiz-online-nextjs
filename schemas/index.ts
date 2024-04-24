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
});

export const ExamWithQuestionSchema = z.object({
  // {
  //   id: '66222c00fa7d388ab521414c',
  //   name: 'Test',
  //   slug: 'test',
  //   description: null,
  //   status: 'PUBLIC',
  //   image: null,
  //   subjectId: '66139f2a5bade4c7aae31f1f',
  //   createAt: 2024-04-19T08:32:00.164Z,
  //   updateAt: 2024-04-19T08:34:37.784Z,
  //   questions: [
  //     {
  //       id: 'clv9398hd0001osoqqvbt5aa9',
  //       question: 'T / F',
  //       type: 'TRUE_FALSE',
  //       image: '',
  //       explanation: '',
  //       examId: '66222c00fa7d388ab521414c'
  //     }
  //   ]
  // }
  id: z.string(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["PUBLIC", "PRIVATE"]).optional(),
  image: z.string().optional(),
  subjectId: z.string().optional(),
  createAt: z.date().optional(),
  updateAt: z.date().optional(),
  questions: z
    .array(
      z.object({
        id: z.string(),
        question: z.string(),
        type: z.enum(["MCQ", "MRQ", "TRUE_FALSE", "SHORT_ANSWER"]),
        image: z.string().optional(),
        explanation: z.string().optional(),
        examId: z.string(),
      })
    )
    .optional(),
});

export const UpdateExplanationSchema = z.object({
  id: z.string().optional(),
  explanation: z.string().optional(),
});

export const UpdateQuestionSchema = z.object({
  id: z.string(),
  question: z.string().optional(),
  type: z.enum(["MCQ", "MRQ", "TRUE_FALSE", "SHORT_ANSWER"]).optional(),
  image: z.string().optional(),
  explanation: z.string().optional(),
  examId: z.string().optional(),
  answers: z.array(AnswerSchema).optional(),
});
