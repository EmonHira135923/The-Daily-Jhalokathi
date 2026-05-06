import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { requireAdmin } from "@/app/(Backend)/middlewares/adminMiddleware";
import bcrypt from "bcrypt";

export async function GET(request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin.success) return admin.response;

    const userCollection = await getUsers();
    const result = await userCollection
      .find()
      .sort({ created_at: -1 })
      .toArray();

    return Response.json(
      {
        message: "All data fetched successfully.",
        success: true,
        result,
      },
      { status: 200 },
    );
  } catch (error) {
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

export async function POST(request) {
  try {
    const userCollection = await getUsers();
    const body = await request.json();
    const { name, email, password, phone, image } = body;

    if (!name || !email || !password) {
      return Response.json(
        {
          success: false,
          message: "Missing required fields (name, email, or password)",
        },
        { status: 400 },
      );
    }

    const isExist = await userCollection.findOne({ email });
    if (isExist) {
      return Response.json(
        { success: false, message: "User already exists with this email" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      image: image || null,
      role: "user",
      created_at: new Date(),
      updated_at: null,
    };

    const result = await userCollection.insertOne(newUser);

    return Response.json(
      {
        message: "User registered successfully.",
        success: true,
        result: {
          insertedId: result.insertedId,
          user: { email, name },
        },
      },
      { status: 201 },
    );
  } catch (error) {
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
