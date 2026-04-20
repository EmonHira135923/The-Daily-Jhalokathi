// lib/cloudinary.js
export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  // Validate file
  if (!(file instanceof File)) {
    throw new Error("Invalid file provided");
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error("File size too large. Maximum size is 10MB");
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed");
  }

  // Check environment variables
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    console.error("Cloudinary config missing:", { cloudName: !!cloudName, uploadPreset: !!uploadPreset });
    throw new Error("Cloudinary configuration is missing");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    console.log("Uploading to Cloudinary:", { cloudName, uploadPreset, fileName: file.name, fileSize: file.size, fileType: file.type });

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Cloudinary API Error:", {
        status: res.status,
        statusText: res.statusText,
        response: errorText
      });
      throw new Error(`Failed to upload image to Cloudinary: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Cloudinary upload success:", data.secure_url);
    return data.secure_url; // এটি ইমেজের ডিরেক্ট লিঙ্ক রিটার্ন করবে
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error; // Re-throw to let caller handle it
  }
};