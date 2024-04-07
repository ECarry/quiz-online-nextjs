"use server";

import { db } from "@/lib/db";
import { NewQuestionSchema } from "@/schema";
import { z } from "zod";

export const newQuestion = async (values: z.infer<typeof NewQuestionSchema>) => {
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
      },
    });

    return { question, success: "Create successful" };
  } catch (error) {
    return { error: "Something wrong" };
  }
};
