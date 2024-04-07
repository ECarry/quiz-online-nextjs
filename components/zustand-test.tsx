"use client";

import { Button } from "./ui/button";
import { useModal } from "@/hooks/use-modal-store";

const ZustandTest = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <h1>Zustand Modal Test</h1>
      <Button onClick={() => onOpen("test")}>Open</Button>
    </div>
  );
};

export default ZustandTest;
