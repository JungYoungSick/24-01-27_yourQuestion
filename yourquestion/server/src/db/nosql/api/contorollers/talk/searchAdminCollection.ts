import { client } from "../../../server";
// 관리자 컬렉션 검색 (searchAdminCollection)
// 이 함수는 주어진 키워드를 사용하여 관리자 컬렉션에서 문서를 검색하고, 검색 결과를 배열 형태로 반환합니다. 만약 오류가 발생하면 적절한 오류 처리를 수행합니다.

export async function searchAdminCollection(
  userID: string,
  keyword: string
): Promise<Array<Record<string, any>>> {
  const db = client.db("prompt");
  const collection = db.collection("adminSaveData");

  try {
    const query = {
      userID: userID, // 이 부분을 keyword로 변경
      ...(keyword ? { text: { $regex: keyword, $options: "i" } } : {}), // 이 부분을 userID로 변경
    };
    const results = await collection.find(query).toArray();
    console.log("userID:", userID, "keyword:", keyword);
    console.log("검색쿼리:", query);
    console.log("Admin 데이터 검색 완료", results);
    return results;
  } catch (error) {
    console.error("Admin 컬렉션 검색 중 오류 발생:", error);
    throw error;
  }
}
