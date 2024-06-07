"use client";

import { Answer, Question } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addWrongQuestion } from "@/actions/question";
import { useWindowSize } from "react-use";

import Header from "./header";
import { Badge } from "@/components/ui/badge";
import QuestionBubble from "./question-bubble";
import Challenge from "./challenge";
import Footer from "./footer";

import Tip from "./tip";
import Confetti from "react-confetti";
import Explanation from "./explanation";
import { useCurrentRole } from "@/hooks/user-current-role";

interface QuestionWithAnswer extends Question {
  answers: Answer[];
}

interface Props {
  questions: QuestionWithAnswer[];
}

const Quiz = ({ questions }: Props) => {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [status, setStatus] = useState<
    "none" | "correct" | "wrong" | "complete"
  >("none");
  const role = useCurrentRole();

  useEffect(() => {
    // save current quiz to local storage
    localStorage.setItem(
      "currentQuestionIndex",
      JSON.stringify(currentQuestionIndex)
    );
  }, [currentQuestionIndex]);

  const currentQuestionData = questions[currentQuestionIndex];
  const answers = currentQuestionData?.answers || [];

  const onNext = () => {
    setCurrentQuestionIndex((current) => current + 1);
  };

  const onSelect = (id: string) => {
    if (status !== "none") return;

    if (currentQuestionData.type === "MRQ") {
      setSelectedOptions((pre) => {
        // 检查选项是否已经被选中
        const isSelected = pre.includes(id);
        // 如果选项已经被选中，则取消选中
        if (isSelected) {
          return pre.filter((option) => option !== id);
        } else {
          // 如果选项未被选中，则选中该选项
          return [...pre, id];
        }
      });
    } else {
      setSelectedOption(id);
    }
  };

  const onInput = (value: string) => {
    setInputValue(value);
  };

  const onContinue = () => {
    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      setSelectedOptions([]);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      setSelectedOptions([]);
      return;
    }

    if (currentQuestionData.type === "MRQ") {
      if (selectedOptions.length === 0) return;

      const correctOptions = answers.filter(
        (answer) => answer.isCorrect === true
      );

      const correctOptionIds = correctOptions.map((option) => option.id);

      const isCorrect =
        correctOptionIds.length === selectedOptions.length &&
        correctOptionIds.every((option) => selectedOptions.includes(option));

      if (isCorrect) {
        setStatus("correct");
        setInputValue("");
      } else {
        setStatus("wrong");
        addWrongQuestion(currentQuestionData.id).then((data) => {
          console.log(data?.success);
        });
      }
    } else if (currentQuestionData.type === "SHORT_ANSWER") {
      if (
        inputValue.toLowerCase() ===
        currentQuestionData.answers[0].answer.toLowerCase()
      ) {
        setStatus("correct");
      } else {
        setStatus("wrong");
        addWrongQuestion(currentQuestionData.id).then((data) => {
          console.log(data?.success);
        });
      }
    } else {
      const correctOption = answers.find((answer) => answer.isCorrect === true);

      if (correctOption && correctOption.id === selectedOption) {
        setStatus("correct");
      } else {
        setStatus("wrong");
        addWrongQuestion(currentQuestionData.id).then((data) => {
          console.log(data?.success);
        });
      }
    }
  };

  const handleShowAnswer = () => {
    const correctOption = answers.filter((answer) => answer.isCorrect === true);
    if (currentQuestionData.type === "SHORT_ANSWER") {
      setInputValue(currentQuestionData.answers[0].answer);
    } else if (currentQuestionData.type === "MRQ") {
      setSelectedOptions(correctOption.map((option) => option.id));
    } else {
      setSelectedOption(correctOption ? correctOption[0].id : undefined);
    }

    setStatus("none");
  };

  if (!currentQuestionData) {
    return (
      <>
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
          width={width}
          height={height}
        />
        <div className="flex flex-col items-center justify-center w-full h-full gap-y-4 max-w-lg mx-auto ">
          <h1 className="text-[100px]">🎊</h1>
          <h1 className="text-lg text-center font-bold">
            Great job! <br /> You&apos;ve completed.
          </h1>
        </div>
        <Footer
          onCheck={() => router.push("/main")}
          status={"complete"}
          disabled={false}
        />
      </>
    );
  }

  const disabledCheckBtn = () => {
    if (currentQuestionData.type === "MRQ") {
      return selectedOptions.length < 2;
    } else if (currentQuestionData.type === "SHORT_ANSWER") {
      return inputValue === "";
    } else {
      return !selectedOption;
    }
  };

  const BadgeType = () => {
    switch (currentQuestionData.type) {
      case "MCQ":
        return <Badge>单选题</Badge>;
      case "MRQ":
        return <Badge variant="destructive">多选题</Badge>;
      case "TRUE_FALSE":
        return <Badge variant="outline">判断题</Badge>;
      case "SHORT_ANSWER":
        return <Badge variant="secondary">简答题</Badge>;
    }
  };

  return (
    <>
      <Header current={currentQuestionIndex} total={questions.length} />
      <div className="flex-1 relative">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col lg:gap-y-12 gap-y-6">
            <div className="flex items-center justify-center">
              <BadgeType />
            </div>
            <div className="">
              <QuestionBubble question={currentQuestionData.question} />
              <Challenge
                answers={answers}
                onSelect={onSelect}
                onInput={onInput}
                inputValue={inputValue}
                status={status}
                selectedOption={selectedOption}
                selectedOptions={selectedOptions}
                disabled={false}
                type={currentQuestionData.type}
              />
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-8">
          {currentQuestionData.explanation && (
            <Tip content={currentQuestionData.explanation} />
          )}
        </div>
        {role === "ADMIN" && (
          <div className="absolute bottom-8 right-8 hidden lg:block">
            <Explanation
              id={currentQuestionData.id}
              explanation={currentQuestionData.explanation}
            />
          </div>
        )}
      </div>
      <Footer
        onShowAnswer={handleShowAnswer}
        onCheck={onContinue}
        status={status}
        disabled={disabledCheckBtn()}
      />
    </>
  );
};

export default Quiz;
