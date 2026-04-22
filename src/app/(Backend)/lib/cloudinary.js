export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  const formData = new FormData();

  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );

  formData.append("folder", "AllNews");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return {
    secure_url: data.secure_url,
    public_id: data.public_id,
  };
};