import { getQuestionWithAnswersById } from "@/data/question";
import EditQuestionForm from "./edit-question-form";
import Modal from "./modal";

interface Props {
  params: {
    id: string;
  };
}

const Page = async ({ params }: Props) => {
  const { id } = params;

  if (!id) {
    return null;
  }

  const question = await getQuestionWithAnswersById(id);

  if(!question) {
    return null;
  }

  return (
    <Modal>
      <EditQuestionForm question={question} answers={question.answers} />
    </Modal>
  );
};

export default Page;
