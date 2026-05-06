import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const authErrorResponse = (auth, fallbackMessage = "Unauthorized Access") => {
  return NextResponse.json(
    {
      success: false,
      message: auth?.message || fallbackMessage,
    },
    { status: auth?.status || 401 },
  );
};

export const verifyToken = async (request) => {
  try {
    let token = null;

    // Authorization header check
    const authHeader = request.headers.get("authorization");

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // Cookie check
    if (!token) {
      token = request.cookies?.get("accessToken")?.value;
    }

    if (!token) {
      return {
        success: false,
        status: 401,
        message: "Unauthorized: No token provided",
      };
    }

    if (!process.env.NEXTAUTH_SECRET) {
      return {
        success: false,
        status: 500,
        message: "Auth secret is not configured",
      };
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);

    return {
      success: true,
      decoded,
    };
  } catch {
    return {
      success: false,
      status: 401,
      message: "Invalid or expired token",
    };
  }
};

export const requireAuth = async (request) => {
  const auth = await verifyToken(request);

  if (!auth.success) {
    return {
      success: false,
      response: authErrorResponse(auth),
    };
  }

  return {
    success: true,
    user: auth.decoded,
  };
};
