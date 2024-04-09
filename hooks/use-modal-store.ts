import { Subject } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "test"
  | "createCategory"
  | "createExam"
  | "editCategory";

interface ModalData {
  id?: string;
  category?: Subject;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
