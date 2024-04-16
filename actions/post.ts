import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NewPostSchema } from "@/schemas";
import { z } from "zod";

export const newPost = async (values: z.infer<typeof NewPostSchema>) => {
  const user = await currentUser();
  const validatedFields = NewPostSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error };
  }

  if (!user) {
    return { error: "You must be logged in to create a post" };
  }

  try {
    const post = await db.post.create({
      data: {
        userId: user.id,
        ...validatedFields.data,
      },
    });

    return { post, success: "Create successful!" };
  } catch (error) {
    return { error: "Something wrong" };
  }
};
