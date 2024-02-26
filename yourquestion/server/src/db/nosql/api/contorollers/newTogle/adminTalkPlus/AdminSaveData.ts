// 관리자 데이터 추가 방식의 저장

import { client } from "../../../../server";
import { getNextSequenceNumber } from "../../talk/getNextSquenceNumber";
import { Db, Collection } from "mongodb";

const dbName: string = "prompt";
const collectionName: string = "adminSaveData"; // 데이터를 저장할 컬렉션

export async function AdminSavaData(
  data: Record<string, any>
): Promise<{ message: string; _id: unknown; sequenceNumber: number }> {
  try {
    const db: Db = client.db(dbName);
    const collection: Collection = db.collection(collectionName);
    const sequenceNumber: number = await getNextSequenceNumber(
      collectionName,
      "adminSaveData"
    );

    const adminSave = {
      ...data,
      sequenceNumber,
      receivedAt: new Date(),
    };

    const result = await collection.insertOne(adminSave);
    console.log("저장 전 data 객체:", data);
    return {
      message: "답변자 데이터 저장 성공",
      _id: result.insertedId,
      sequenceNumber,
    };
  } catch (error) {
    console.error("AdminSavaData 함수에서 에러가 발생하였습니다.", error);
    throw error;
  }
}
