"use client";

import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const ExitModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "exit";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-2">
            <p className="text-[72px]">👿</p>
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Are you sure you want to leave?
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You will lose all your progress.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-4 w-full">
            <Button className="w-full" size="lg" onClick={onClose}>
              CONTINUE QUIZ
            </Button>
            <Button
              className="w-full"
              size="lg"
              variant="destructive"
              onClick={() => {
                onClose();
                router.push("/main");
              }}
            >
              END QUIZ
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitModal;
