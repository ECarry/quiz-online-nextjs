"use client";

import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/use-modal-store";
import { CreateCategorySchema } from "@/schema";
import { useTransition, useState, useLayoutEffect } from "react";
import { updateCategory } from "@/actions/question";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../image-upload";
import FormError from "../form-error";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const EditCategoryModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "editCategory";

  const { category } = data;

  const form = useForm<z.infer<typeof CreateCategorySchema>>({
    resolver: zodResolver(CreateCategorySchema),
  });

  const {
    formState: { isDirty },
  } = form;

  useLayoutEffect(() => {
    if (category) {
      form.setValue("name", category.name);
      form.setValue("description", category.description || "");
      form.setValue("image", category.image || "");
    }
  }, [category, form]);

  function onSubmit(values: z.infer<typeof CreateCategorySchema>) {
    setError("");

    const id = category?.id;

    if (!id) {
      setError("Category id missing!");
      return null;
    }

    startTransition(() => {
      updateCategory(values, id).then((data) => {
        if (data.error) {
          setError(data.error);
        } else if (data.success) {
          toast("Successful!", {
            description: data.success,
          });
          setError("");
          form.reset();
          onClose();
        }
      });
    });
  }

  const handleClose = () => {
    setError("");
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Create Category(HCIP Storage, HCIP Datacom Advanced Routing &
            Switching Technology)
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormError message={error} />
            <Button
              type="submit"
              disabled={isPending || !isDirty}
              className="w-full"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <span>Save</span>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
