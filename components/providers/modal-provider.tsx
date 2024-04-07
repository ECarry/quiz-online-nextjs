"use client";

import { useEffect, useState } from "react";
import TestModal from "../modals/test-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <TestModal />
    </>
  );
};
