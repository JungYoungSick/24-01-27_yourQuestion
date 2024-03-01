// 관리자 데이터 추가 방식의 저장

import { client } from "../../../../server";
import { getNextSequenceNumber } from "../../talk/getNextSquenceNumber";
import { Db, Collection } from "mongodb";
import jwt, { JwtPayload } from "jsonwebtoken";

const dbName: string = "prompt";
const collectionName: string = "adminSaveData";

export async function AdminSavaData(
  token: string,
  data: Record<string, any>
): Promise<{ message: string; _id: unknown; sequenceNumber: number }> {
  try {
    console.log("Received token:", token);
    const decoded = jwt.decode(token);
    if (typeof decoded !== "object" || decoded === null) {
      throw new Error("Invalid token: Unable to decode");
    }
    const userID = decoded["userID"];
    console.log(userID);

    const db: Db = client.db(dbName);
    const collection: Collection = db.collection(collectionName);
    const sequenceNumber: number = await getNextSequenceNumber(
      collectionName,
      "adminSaveData"
    );

    const adminSave = {
      ...data,
      userID,
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
