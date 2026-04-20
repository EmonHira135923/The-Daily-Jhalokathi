// lib/cloudinary.js

export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { 
        method: "POST", 
        body: formData 
      }
    );

    if (!res.ok) {
        throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await res.json();
    return data.secure_url; // এটি ইমেজের ডিরেক্ট লিঙ্ক রিটার্ন করবে
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};