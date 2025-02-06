export interface PresignedPost {
  url: string;
  fields: Record<string, string>;
}

export async function uploadFileToS3(file: File, presignedPost: PresignedPost) {
  const { url, fields } = presignedPost;

  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append("file", file);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}
