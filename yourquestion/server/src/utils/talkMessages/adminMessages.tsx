import { Request, Response } from "express";
import { client } from "../../db/nosql/server"; // MongoDB client를 import합니다. 실제 경로에 맞게 수정하세요.
export const getAdminMessages = async (req: Request, res: Response) => {
  try {
    const dbName = "prompt";
    const collectionName = "admin";
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const messages = await collection.find({}).toArray();
    res.status(200).json(messages);
  } catch (error) {
    console.error("Failed to fetch messages from MongoDB:", error);
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
};
