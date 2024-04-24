import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

interface FooterProps {
  onShowAnswer?: () => void;
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "complate";
  disabled?: boolean;
}

const Footer = ({ onCheck, status, disabled, onShowAnswer }: FooterProps) => {
  return (
    <footer
      className={cn(
        "h-[100px] lg:h-[140px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100"
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div
            className="
          text-green-500 font-bold text-base lg:text-2xl flex items-center
        "
          >
            <CheckCircle className="mr-4 lg:mr-2 size-6 lg:size-10" />
            Nicely done!
          </div>
        )}
        {status === "wrong" && (
          <div
            className="
          text-rose-500 font-bold text-base lg:text-2xl flex items-center
        "
          >
            <XCircle className="mr-4 lg:mr-2 size-6 lg:size-10" />
            Oops! Try again!
          </div>
        )}
        <Button
          disabled={disabled}
          className="ml-auto w-[100px]"
          onClick={onCheck}
          variant={status === "wrong" ? "destructive" : "default"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
          {status === "complate" && "Back"}
        </Button>
        {status !== "complate" && (
          <Button
            variant="outline"
            className="ml-2"
            onClick={onShowAnswer}
            disabled={status === "correct"}
          >
            🔍
          </Button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
