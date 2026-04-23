export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch("/api/auth/myprofile", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return { success: false };
  }
};

export const logoutUser = async () => {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
    // ✅ localStorage থেকেও token মুছুন
    localStorage.removeItem("accessToken");
    return true;
  } catch (error) {
    console.error("Logout Error:", error);
    return false;
  }
};