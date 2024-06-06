"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  CreateCategorySchema,
  CreateExamSchema,
  NewQuestionSchema,
  UpdateExplanationSchema,
  UpdateQuestionSchema,
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

export const addWrongQuestionLife = async (questionId: string) => {
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

  const wrongQuestion = await db.wrongQuestion.findFirst({
    where: {
      questionId,
    },
  });

  if (!wrongQuestion) {
    return;
  }

  if (wrongQuestion.life === 0) {
    return;
  }

  try {
    await db.wrongQuestion.update({
      where: {
        id: wrongQuestion.id,
      },
      data: {
        life: wrongQuestion.life ? wrongQuestion.life + 1 : 3,
      },
    });

    revalidatePath("/practice/mistakes");

    return { success: "Added life" };
  } catch (error) {
    console.log("Something wrong");
  }
};

export const removeWrongQuestionLife = async (questionId: string) => {
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

  const wrongQuestion = await db.wrongQuestion.findFirst({
    where: {
      questionId,
    },
  });

  if (!wrongQuestion) {
    return;
  }

  if (wrongQuestion.life === 0) {
    await db.wrongQuestion.delete({
      where: {
        id: wrongQuestion.id,
      },
    });
  }

  try {
    const life = wrongQuestion.life;
    if (life === 1) {
      await db.wrongQuestion.delete({
        where: {
          id: wrongQuestion.id,
        },
      });
    } else {
      await db.wrongQuestion.update({
        where: {
          id: wrongQuestion.id,
        },
        data: {
          life: life ? life - 1 : 3,
        },
      });
    }
    revalidatePath("/practice/mistakes");

    return { success: "Removed life" };
  } catch (error) {
    console.log("Something wrong");
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

export const updateExplanation = async (
  values: z.infer<typeof UpdateExplanationSchema>
) => {
  const validatedFields = UpdateExplanationSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const existingQuestion = await db.question.findUnique({
    where: { id: values.id },
  });

  if (!existingQuestion) {
    return { error: "Question not found." };
  }

  try {
    await db.question.update({
      where: { id: values.id },
      data: {
        explanation: values.explanation,
      },
    });

    //revalidatePath("/quiz");

    return { success: "Explanation updated." };
  } catch (error) {
    console.log(error);

    return { error: "Something wrong" };
  }
};

export const updateQuestion = async (
  values: z.infer<typeof UpdateQuestionSchema>
) => {
  const validatedFields = UpdateQuestionSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const existingQuestion = await db.question.findUnique({
    where: { id: values.id },
  });

  if (!existingQuestion) {
    return { error: "Question not found." };
  }

  const existingExam = await db.exam.findUnique({
    where: { id: values.examId },
  });

  if (!existingExam) {
    return { error: "Exam not found." };
  }

  if (!existingExam.subjectId) {
    return { error: "Exam not found." };
  }

  const existingSubject = await db.subject.findUnique({
    where: { id: existingExam.subjectId },
  });

  if (!existingSubject) {
    return { error: "Subject not found." };
  }

  if (values.answers) {
    try {
      await db.answer.deleteMany({
        where: { questionId: values.id },
      });

      const answersToCreate = values.answers.map((answer) => ({
        answer: answer.answer,
        isCorrect: answer.isCorrect,
        questionId: existingQuestion.id,
      }));

      await db.answer.createMany({
        data: answersToCreate,
      });
    } catch (error) {
      console.log(error);
      return { error: "Something wrong" };
    }
  }

  try {
    await db.question.update({
      where: { id: values.id },
      data: {
        question: values.question,
        type: values.type,
        image: values.image,
        explanation: values.explanation,
      },
    });

    return { success: "Question updated." };
  } catch (error) {
    console.log(error);

    return { error: "Something wrong" };
  }
};
