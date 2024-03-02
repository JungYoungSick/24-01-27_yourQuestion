// MongoDB에서 데이터 가져오기
// 이 함수는 주어진 쿼리에 따라 MongoDB에서 데이터를 검색하고, 검색 결과를 배열로 반환합니다. 만약 오류가 발생하면 적절한 오류 처리를 수행합니다.

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
