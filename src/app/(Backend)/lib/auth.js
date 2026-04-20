// lib/auth.js

export const fetchUserProfile = async () => {
  if (typeof window === "undefined") return { success: false };
  const token = localStorage.getItem("accessToken");
  if (!token) return { success: false };

  try {
    const res = await fetch("/api/auth/myprofile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return { success: false };
  }
};

export const logoutUser = async () => {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("accessToken");
    return true; // সফল হলে true রিটার্ন করবে
  } catch (error) {
    console.error("Logout Error:", error);
    return false;
  }
};