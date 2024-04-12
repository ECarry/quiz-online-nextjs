import { Progress } from "@/components/ui/progress";
import { useModal } from "@/hooks/use-modal-store";
import { X } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

interface Props {
  progress: number;
  current: number;
  total: number;
}

const Header = ({ progress, current, total }: Props) => {
  const { onOpen } = useModal();

  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between mx-auto w-full">
      <X
        onClick={() => onOpen("exit")}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />

      <Progress value={progress} className="w-[50%] h-2 lg:h-3" />
      <div className="text-center relative overflow-hidden flex items-center gap-1">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={current}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ ease: "backIn", duration: 0.75 }}
            className="block font-semibold text-lg text-black"
          >
            {current + 1}
          </motion.span>
        </AnimatePresence>
        /<span>{total}</span>
      </div>
    </header>
  );
};

export default Header;
