import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { UpdateExplanationSchema } from "@/schemas";
import { updateExplanation } from "@/actions/question";

interface ExplanationProps {
  id: string;
  explanation?: string | null;
}

const FormSchema = UpdateExplanationSchema;

const Explanation = ({ id, explanation }: ExplanationProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id,
      explanation: explanation || "",
    },
  });

  useEffect(() => {
    if (!explanation)
      form.reset({
        explanation: "",
      });
    if (explanation) {
      form.setValue("explanation", explanation);
    }
  }, [explanation, form]);

  useEffect(() => {
    if (id) {
      form.setValue("id", id);
    }
  }, [id, form]);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);

    startTransition(() => {
      updateExplanation(values).then((data) => {
        if (data.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: data.error,
          });
        } else if (data.success) {
          toast({
            variant: "success",
            title: "Success",
            description: "Explanation updated successfully",
          });
        }
      });
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add Explanation</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Explanation</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4"
          >
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="w-full" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea className="min-h-[200px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default Explanation;
