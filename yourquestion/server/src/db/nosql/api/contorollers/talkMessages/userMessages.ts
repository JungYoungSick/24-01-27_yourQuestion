// 사용자 메시지 가져오기
// 이 함수는 MongoDB에서 모든 사용자 메시지를 검색하여 클라이언트에 반환합니다. 만약 검색 중에 오류가 발생하면 적절한 상태 코드와 함께 오류 메시지를 반환합니다.

import { Request, Response } from "express";
import { client } from "../../../server";

export const getUserMessages = async (req: Request, res: Response) => {
  try {
    const dbName = "prompt";
    const collectionName = "user";
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
