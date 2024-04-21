import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserByEmail, getUserById } from "./user";

export const getCategory = async () => {
  try {
    const categories = await db.subject.findMany({});

    return categories;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryWithExams = async () => {
  try {
    const categories = await db.subject.findMany({
      include: {
        exams: true,
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryBySlug = async (slug: string) => {
  try {
    const category = await db.subject.findUnique({
      where: {
        slug: slug,
      },
    });

    return category;
  } catch (error) {
    console.log(error);
  }
};

export const getExamsById = async (id: string) => {
  try {
    const exams = await db.exam.findMany({
      where: {
        subjectId: id,
      },
      include: {
        questions: true,
      },
    });

    return exams;
  } catch (error) {
    console.log(error);
  }
};

export const getSubject = async () => {
  try {
    const subjects = await db.subject.findMany({});

    return subjects;
  } catch (error) {
    console.log(error);
  }
};

export const getExamBySlug = async (slug: string) => {
  try {
    const exam = await db.exam.findUnique({
      where: {
        slug: slug,
      },
    });

    return exam;
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionsByExamSlug = async (slug: string) => {
  try {
    const exam = await db.exam.findUnique({
      where: {
        slug: slug,
      },
      include: {
        questions: true,
      },
    });

    if (!exam) return [];

    const questions = await db.question.findMany({
      where: {
        examId: exam.id,
      },
      include: {
        answers: true,
      },
    });

    return questions;
  } catch (error) {
    console.log(error);
  }
};

export const getExamBySlugWithQuestion = async (slug: string) => {
  try {
    const exam = await db.exam.findUnique({
      where: {
        slug: slug,
      },
      include: {
        questions: true,
      },
    });

    return exam;
  } catch (error) {
    console.log(error);
  }
};

export const getTestsWithQuestions = async (id?: string) => {
  try {
    const quizs = await db.exam.findMany({
      where: {
        subjectId: id,
        status: "PUBLIC",
      },
      include: {
        questions: true,
      },
    });

    return quizs;
  } catch (error) {}
};

export const getQuestionsByExamId = async (id: string) => {
  try {
    const questions = await db.question.findMany({
      where: {
        examId: id,
      },
      include: {
        answers: true,
      },
    });

    return questions;
  } catch (error) {}
};

export const getMistakeQuestions = async () => {
  const user = await currentUser();

  if (!user) return [];

  if (!user.email) throw new Error("Unauthenticated");

  const existingUser = await db.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!existingUser) throw new Error("User not found");

  try {
    const mistakes = await db.wrongQuestion.findMany({
      where: {
        userId: existingUser.id,
      },
      include: {
        question: true,
      },
    });

    return mistakes;
  } catch (error) {
    console.log(error);
  }
};
