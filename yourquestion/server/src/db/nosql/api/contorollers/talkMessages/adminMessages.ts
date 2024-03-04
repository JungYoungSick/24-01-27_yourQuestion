import { Request, Response } from "express";
import { client } from "../../../server";

export const getAdminMessages = async (req: Request, res: Response) => {
  try {
    const { userID, title } = req.query as { userID: string; title: string };
    const dbName = "prompt";
    const collectionName = "admin";
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    // userID와 title 조건을 추가하여 검색합니다.
    const messages = await collection
      .find({ userID: userID, title: title })
      .toArray();
    res.status(200).json(messages);
  } catch (error) {
    console.error("Failed to fetch messages from MongoDB:", error);
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
};
