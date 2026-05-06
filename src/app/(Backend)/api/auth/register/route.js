import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { requireAdmin } from "@/app/(Backend)/middlewares/adminMiddleware";
import bcrypt from "bcrypt";

// Get Method
export async function GET(request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin.success) return admin.response;

    // 1. You MUST await the collection/connection
    const userCollection = await getUsers();

    // 2. Await the database query
    const result = await userCollection
      .find()
      .sort({ created_at: -1 })
      .toArray();

    // console.log(result);

    return Response.json(
      {
        message: "All data fetch successfully.",
        success: true,
        result,
      },
      { status: 200 },
    );
  } catch (error) {
    // console.error("Database Error:", error);
    return Response.json(
      {
        message: "Failed to fetch data",
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// Post Method
export async function POST(request) {
  try {
    const userCollection = await getUsers(); // Apnar DB collection function
    const body = await request.json();

    const { name, email, password, phone, image } = body;

    // Basic Validation
    if (!name || !email || !password) {
      return Response.json(
        {
          success: false,
          message: "Missing required fields (name, email, or password)",
        },
        { status: 400 },
      );
    }

    // 1. Existing User Check (Unique Email Validation)
    const isExist = await userCollection.findOne({ email });
    if (isExist) {
      return Response.json(
        { success: false, message: "User already exists with this email" },
        { status: 400 },
      );
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    // Data Format Ready Kora
    const newUser = {
      name,
      email,
      password: hasedPassword, // Real project-e ekhane password hash kora uchit (bcrypt)
      phone: phone || "",
      image: image || null,
      role: "user",
      created_at: new Date(),
      updated_at: null, // Initial registration-e eta null thakbe
    };

    // Database-e insert kora
    const result = await userCollection.insertOne(newUser);

    // API thikvabe kaj korche ki na check korar jonno log
    console.log("✅ New User Created Successfully:", {
      id: result.insertedId,
      email: newUser.email,
      role: newUser.role,
      image_url: newUser.image, // Log image url to verify
      timestamp: newUser.created_at,
    });

    return Response.json(
      {
        message: "User registered successfully.",
        success: true,
        result: {
          insertedId: result.insertedId,
          user: { email, name }, // Security-r jonno password response-e pathaben na
        },
      },
      { status: 201 },
    );
  } catch (error) {
    // console.error("Database Error:", error);
    return Response.json(
      {
        message: "Failed to insert data",
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
