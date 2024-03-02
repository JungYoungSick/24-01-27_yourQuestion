// 관리자 데이터 추가 방식의 저장
// 이 함수는 주어진 토큰을 사용하여 관리자가 제공한 데이터를 데이터베이스에 저장하는 데 사용됩니다. 데이터베이스와 컬렉션 이름은 코드 내에서 하드코딩되어 있으며, getNextSequenceNumber 함수를 통해 새로운 문서의 시퀀스 번호를 생성하고, JWT를 사용하여 사용자 ID를 추출합니다.

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
