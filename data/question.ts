import { db } from "@/lib/db";

export const getSubject = async () => {
  try {
    const subjects = await db.subject.findMany({});

    return subjects;
  } catch (error) {
    console.log(error);
  }
};
