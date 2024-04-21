"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  CreateCategorySchema,
  CreateExamSchema,
  NewQuestionSchema,
} from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

export const addWrongQuestion = async (questionId: string) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/auth/login");
  }

  if (!user.email) {
    throw new Error("User not found");
  }

  const existingUser = await db.user.findUnique({
    where: { email: user.email },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const question = await db.question.findUnique({
    where: { id: questionId },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  const existingWrongQuestion = await db.wrongQuestion.findFirst({
    where: {
      questionId: question.id,
      userId: existingUser.id,
    },
  });

  if (existingWrongQuestion) {
    return;
  }

  try {
    const wrongQuestion = await db.wrongQuestion.create({
      data: {
        questionId: question.id,
        userId: existingUser.id,
      },
    });

    return { wrongQuestion, success: "Added to wrong questions" };
  } catch (error) {
    throw new Error("Something wrong");
  }
};

export const deleteQuestion = async (questionId: string) => {
  if (!questionId) {
    return { error: "Question id missing." };
  }

  const existingQuestion = await db.question.findUnique({
    where: { id: questionId },
  });

  if (!existingQuestion) {
    return { error: "Question not found." };
  }

  try {
    await db.question.delete({
      where: { id: questionId },
    });

    revalidatePath("/dashboard/categories");

    return { success: "Question deleted." };
  } catch (error) {
    console.log(error);
    return { error: "Something wrong." };
  }
};
