"use server";

import { db } from "@/lib/db";
import { NewQuestionSchema } from "@/schema";
import { z } from "zod";

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
        subjectId: values.subjectId,
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
    return { error: "Something wrong" };
  }
};
