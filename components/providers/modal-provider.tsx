"use client";

import { useEffect, useState } from "react";

import CreateCategoryModal from "../modals/create-category-modal";
import CreateExamModal from "../modals/create-exam-modal";
import EditCategoryModal from "../modals/edit-category-modal";

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
      <CreateCategoryModal />
      <CreateExamModal />
      <EditCategoryModal />
    </>
  );
};
