// 관리자 컬렉션 검색 (searchAdminCollection)

import { client } from "../../../server";

export async function searchAdminCollection(
  keyword: string
): Promise<Array<Record<string, any>>> {
  const db = client.db("prompt");
  const collection = db.collection("admin");

  try {
    const query = keyword ? { text: { $regex: keyword, $options: "i" } } : {};
    const results = await collection.find(query).toArray();

    console.log("Admin 데이터 검색 완료");
    return results;
  } catch (error) {
    console.error("Admin 컬렉션 검색 중 오류 발생:", error);
    throw error;
  }
}
