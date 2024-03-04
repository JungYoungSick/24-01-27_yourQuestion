// userMessages.ts
import { Request, Response } from "express";
import { getUserMessages } from "./userIdTitle";

export const getUserIDTitle = async (req: Request, res: Response) => {
  try {
    const { userID, title } = req.query as { userID: string; title: string };
    const messages = await getUserMessages(userID, title);
    res.json(messages);
  } catch (error: any) {
    console.error("Failed to retrieve user messages:", error);
    res.status(500).send(error.message);
  }
};
