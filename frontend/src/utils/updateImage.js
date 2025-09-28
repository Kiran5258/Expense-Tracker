import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";

const updateImage = async (imageFile) => {
  if (!imageFile) return {}; // skip if no image

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading the image", error);
    throw error;
  }
};

export default updateImage;
