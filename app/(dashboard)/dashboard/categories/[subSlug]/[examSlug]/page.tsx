import { getExamBySlugWithQuestion } from "@/data/question";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface Props {
  params: {
    examSlug: string;
  };
}
const page = async ({ params }: Props) => {
  const questions = await getExamBySlugWithQuestion(params.examSlug);

  if (!questions) {
    return <div>404</div>;
  }

  return (
    <div className="w-full h-full">
      <DataTable columns={columns} data={questions} />
    </div>
  );
};

export default page;
