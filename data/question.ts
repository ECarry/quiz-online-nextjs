import { db } from "@/lib/db";

export const getCategory = async () => {
  try {
    const categories = await db.subject.findMany({});

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
