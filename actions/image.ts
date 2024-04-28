"use server";

import { utapi } from "@/server/uploadthing";

export const uploadImage = async (file: File) => {
  const response = await utapi.uploadFiles(file);

  if (response.data) {
    return response.data.url;
  } else {
    return "";
  }
};
