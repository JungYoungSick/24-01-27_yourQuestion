// TalkPage 사용자 데이터 MongoDB 저장

import { client } from "../../../server";
import { getNextSequenceNumber } from "./getNextSquenceNumber";

export async function userSaveToMongoDB(
  data: Record<string, any>
): Promise<{ message: string; _id: unknown; sequenceNumber: number }> {
  const db = client.db("prompt");
  const collection = db.collection("user");
  const sequenceNumber = await getNextSequenceNumber("user", "user");

  const documentToInsert = { ...data, sequenceNumber, receivedAt: new Date() };
  const result = await collection.insertOne(documentToInsert);

  return {
    message: "사용자 데이터 저장 성공",
    _id: result.insertedId,
    sequenceNumber,
  };
}
