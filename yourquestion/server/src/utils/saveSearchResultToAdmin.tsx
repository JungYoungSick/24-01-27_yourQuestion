// 검색 결과를 admin 컬렉션에 저장하는 함수
export const saveSearchResultToAdmin = async (data: string) => {
  try {
    await fetch("/nosql/mongodb/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: data }),
    });
    console.log("검색 결과 admin 컬렉션에 저장");
  } catch (error) {
    console.error("검색 결과 admin 컬렉션 저장 실패:", error);
  }
};
