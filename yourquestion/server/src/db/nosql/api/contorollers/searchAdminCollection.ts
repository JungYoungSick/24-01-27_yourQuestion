// api/services/mongo/searchAdminCollection.ts

import { client } from "../../server"; // MongoDB 클라이언트 연결 설정 import

export async function searchAdminCollection(
  keyword: string
): Promise<Array<Record<string, any>>> {
  const db = client.db("prompt"); // 사용할 데이터베이스 지정
  const collection = db.collection("admin"); // 검색할 컬렉션 지정

  try {
    // 검색 쿼리 실행
    const query = keyword ? { text: { $regex: keyword, $options: "i" } } : {};
    const results = await collection.find(query).toArray();

    console.log("Admin 데이터 검색 완료");
    return results;
  } catch (error) {
    console.error("Admin 컬렉션 검색 중 오류 발생:", error);
    throw error; // 오류를 던져 호출자에게 알림
  }
}
