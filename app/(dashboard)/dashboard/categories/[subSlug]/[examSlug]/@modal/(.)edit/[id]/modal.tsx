"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="h-full max-h-[90%] min-w-[80%] bg-primary-foreground">
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
