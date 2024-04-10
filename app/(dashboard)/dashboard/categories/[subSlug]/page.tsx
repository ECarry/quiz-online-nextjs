import React from "react";
import Tab from "./tab";
import { getCategoryBySlug, getExamsById } from "@/data/question";

interface Props {
  params: {
    subSlug: string;
  };
}

const ExamPage = async ({ params }: Props) => {
  const { subSlug } = params;

  const sub = await getCategoryBySlug(subSlug);

  if (!sub) {
    return null;
  }

  const exams = await getExamsById(sub.id);

  return <Tab exams={exams} id={sub.id} slug={subSlug} />;
};

export default ExamPage;
