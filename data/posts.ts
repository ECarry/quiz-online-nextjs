"use server";

import { db } from "@/lib/db";

export const getPosts = async () => {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    return posts;
  } catch (error) {
    console.log(error);

    return [];
  }
};

export const getPostById = async (id: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return null;
    }

    return post;
  } catch (error) {
    console.log(error);

    return null;
  }
};
