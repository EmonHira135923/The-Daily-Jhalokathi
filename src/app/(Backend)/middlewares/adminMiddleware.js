import { authErrorResponse, verifyToken } from "./authMiddleware";

export const verifyAdmin = async (request) => {
  const auth = await verifyToken(request);

  if (!auth.success) {
    return auth;
  }

  // Check admin role
  if (auth.decoded.role !== "admin") {
    return {
      success: false,
      status: 403,
      message: "Forbidden: Admin access only",
    };
  }

  return {
    success: true,
    decoded: auth.decoded,
  };
};

export const requireAdmin = async (request) => {
  const admin = await verifyAdmin(request);

  if (!admin.success) {
    return {
      success: false,
      response: authErrorResponse(admin, "Forbidden: Admin access only"),
    };
  }

  return {
    success: true,
    user: admin.decoded,
  };
};
