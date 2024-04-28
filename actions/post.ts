"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NewPostSchema } from "@/schemas";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const newPost = async (values: z.infer<typeof NewPostSchema>) => {
  const user = await currentUser();
  const validatedFields = NewPostSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error };
  }

  if (!user?.email) {
    return { error: "You must be logged in to create a post" };
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!existingUser) {
    return { error: "User not found" };
  }

  try {
    const post = await db.post.create({
      data: {
        userId: existingUser.id,
        ...validatedFields.data,
      },
    });

    return { success: "Create successful!" };
  } catch (error) {
    console.log(error);

    return { error: "Something wrong" };
  }
};

export const newUndefinedPost = async () => {
  const user = await currentUser();

  if (!user) {
    return { error: "You must be logged in to create a post" };
  }

  const existingUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!existingUser) {
    return { error: "User not found" };
  }

  try {
    const post = await db.post.create({
      data: {
        userId: existingUser.id,
        title: "Untitled",
      },
    });

    return { post, success: "Create successful!" };
  } catch (error) {
    console.log(error);

    return { error: "Something wrong" };
  }
};

export const getPostByID = async (id: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id,
      },
    });

    return post;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const updatePost = async (id: string, content: string) => {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });

    return { success: "Update successful!" };
  } catch (error) {
    console.log(error);

    return { error: "Something wrong" };
  }
};

export const updatePostTitle = async (id: string, title: string) => {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });

    revalidatePath(`/dashboard/posts/new/${id}`);

    return { success: "Update successful!" };
  } catch (error) {
    console.log(error);

    return { error: "Something wrong" };
  }
};

export const updatePostCover = async (id: string, postImage: string) => {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        postImage,
      },
    });

    revalidatePath(`/dashboard/posts/new/${id}`);

    return { success: "Update successful!" };
  } catch (error) {
    console.log(error);

    return { error: "Something wrong" };
  }
};
