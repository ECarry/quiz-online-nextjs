import { getExamBySlugWithQuestion } from "@/data/question";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface Props {
  params: {
    examSlug: string;
  };
}
const page = async ({ params }: Props) => {
  const exam = await getExamBySlugWithQuestion(params.examSlug);

  if (!exam) {
    return null;
  }

  const questions = exam.questions;

  return (
    <div className="w-full h-full">
      <DataTable columns={columns} data={questions} />
    </div>
  );
};

export default page;
