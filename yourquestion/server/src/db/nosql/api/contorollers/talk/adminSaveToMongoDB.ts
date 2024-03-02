// TalkPage 관리자 데이터 MongoDB 저장
// 이 함수는 주어진 데이터를 MongoDB에 저장하고, 삽입된 문서의 ID 및 시퀀스 번호를 반환합니다.

import { client } from "../../../server";
import { getNextSequenceNumber } from "./getNextSquenceNumber";

export async function adminSaveToMongoDB(
  data: Record<string, any>
): Promise<{ message: string; _id: unknown; sequenceNumber: number }> {
  const db = client.db("prompt");
  const adminCollection = db.collection("admin");
  const sequenceNumber = await getNextSequenceNumber("admin", "admin");

  const documentToInsert = {
    ...data,
    sequenceNumber,
    receivedAt: new Date(),
  };
  const result = await adminCollection.insertOne(documentToInsert);

  console.log(`MongoDB에 관리자 데이터가 저장되었습니다: ${result.insertedId}`);

  return {
    message: "관리자 데이터 저장 성공",
    _id: result.insertedId,
    sequenceNumber,
  };
}
