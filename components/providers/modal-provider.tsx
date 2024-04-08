"use client";

import { useEffect, useState } from "react";
import TestModal from "../modals/test-modal";
import CreateCategoryModal from "../modals/create-category-modal";
import CreateExamModal from "../modals/create-exam-modal";

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
      <CreateCategoryModal />
      <CreateExamModal />
    </>
  );
};
