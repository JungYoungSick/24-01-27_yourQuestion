// MongoDB에서 데이터 가져오기

import { client } from "../../../server";
import { Db, Collection } from "mongodb";

const dbName: string = "prompt";
const collectionName: string = "admin";

export async function getFromMongoDB(
  query: Record<string, any>
): Promise<Array<Record<string, any>>> {
  try {
    const db: Db = client.db(dbName);
    const collection: Collection = db.collection(collectionName);

    const result = await collection.find(query).toArray();
    console.log("Admin 데이터 불러오기 완료");
    return result;
  } catch (error) {
    console.error("getFromMongoDB 함수에서 에러가 발생하였습니다.", error);
    throw error;
  }
}
