import { MongoClient, ServerApiVersion } from "mongodb";

// uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@the-daily-news.ulwet12.mongodb.net/?appName=The-Daily-News`;

// client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// db and collection
let db;

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("The-Daily-News");
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
    return db;
  } catch (err) {
    console.error("Mongodb not connected", err.message);
    throw new Error("Database connection failed");
  }
};

// User Collection
export const getUsers = async () => {
  const database = await connectDB();
  return database.collection("users");
};

// News Collection
export const getNews = async () => {
  const database = await connectDB();
  return database.collection("news");
};

// Contact Form Collection
export const getContactform = async () => {
  const database = await connectDB();
  return database.collection("contactform");
};

// Breakin News Collection
export const getBreakingNews = async () => {
  const database = await connectDB();
  return database.collection("breakingnews");
};

// Comments Collection
export const getComments = async () => {
  const database = await connectDB();
  return database.collection("comments");
};

// Replay Collection
export const getReplies = async () => {
  const database = await connectDB();
  return database.collection("replies");
};
