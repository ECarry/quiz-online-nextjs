"use server";

import { db } from "@/lib/db";
import {
  CreateCategorySchema,
  CreateExamSchema,
  NewQuestionSchema,
} from "@/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createCategory = async (
  valuse: z.infer<typeof CreateCategorySchema>
) => {
  const validatedFields = CreateCategorySchema.safeParse(valuse);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const categoryExist = await db.subject.findFirst({
    where: { name: valuse.name },
  });

  if (categoryExist) {
    return { error: "Category already exist!" };
  }

  try {
    const category = await db.subject.create({
      data: {
        slug: valuse.name.slice(0, 30).replace(/\s/g, "-").toLowerCase(),
        ...valuse,
      },
    });

    revalidatePath("/categories");

    return { category, success: `${category.name} created successful.` };
  } catch (error) {
    console.log(error);

    return { error: "Something wrong" };
  }
};

export const updateCategory = async (
  valuse: z.infer<typeof CreateCategorySchema>,
  id: string
) => {
  const validatedFields = CreateCategorySchema.safeParse(valuse);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const existingCategory = await db.subject.findUnique({
    where: { id },
  });

  if (!existingCategory) {
    return { error: "Category not found!" };
  }

  try {
    const category = await db.subject.update({
      where: {
        id,
      },
      data: {
        ...valuse,
      },
    });

    revalidatePath("/categories");

    return { category, success: `${category.name} updated successful.` };
  } catch (error) {
    console.log(error);

    return { error: "Something wrong" };
  }
};

export const createExam = async (valuse: z.infer<typeof CreateExamSchema>) => {
  const validatedFields = CreateExamSchema.safeParse(valuse);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const examExist = await db.exam.findFirst({
    where: { name: valuse.name },
  });

  if (examExist) {
    return { error: "Exam already exist!" };
  }

  try {
    const exam = await db.exam.create({
      data: {
        slug: valuse.name.slice(0, 30).replace(/\s/g, "-").toLowerCase(),
        ...valuse,
      },
    });

    revalidatePath("/categories");

    return { exam, success: `${exam.name} created successful.` };
  } catch (error) {
    return { error: "Something wrong" };
  }
};

export const newQuestion = async (
  values: z.infer<typeof NewQuestionSchema>
) => {
  const validatedFields = NewQuestionSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  try {
    const question = await db.question.create({
      data: {
        question: values.question,
        examId: values.examId,
        type: values.type,
        image: values.image,
        explanation: values.explanation,
      },
    });

    const answersToCreate = values.answers.map((answer) => ({
      answer: answer.answer,
      isCorrect: answer.isCorrect,
      questionId: question.id,
    }));

    await db.answer.createMany({
      data: answersToCreate,
    });

    const questionWithAnswers = await db.question.findUnique({
      where: { id: question.id },
      include: { answers: true },
    });

    return { questionWithAnswers, success: "Create successful" };
  } catch (error) {
    console.log(error);

    return { error: "Something wrong" };
  }
};
