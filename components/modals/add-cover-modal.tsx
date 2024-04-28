"use client";

import { useParams, useRouter } from "next/navigation";
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
import ImageUpload from "../image-upload";
import { useState } from "react";
import { updatePostCover } from "@/actions/post";

const AddCoverModal = () => {
  const params = useParams();
  const [value, setValue] = useState("");
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "addCover";

  const onSave = async () => {
    updatePostCover(params.id as string, value).then((data) => {
      console.log(data);
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-2xl">
            Add cover
          </DialogTitle>
        </DialogHeader>
        <ImageUpload value={value} onChange={(url) => setValue(url || "")} />
        <Button onClick={onSave}>Save</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddCoverModal;
