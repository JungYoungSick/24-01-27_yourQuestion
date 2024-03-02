// 클라이언트 측에서 title 데이터를 포함하여 API 요청을 보내는 함수
export const saveAdminTitle = async (title: string): Promise<void> => {
  let token = localStorage.getItem("token"); // 토큰을 로컬 스토리지에서 가져옵니다.
  if (!token) {
    throw new Error("Token is not available");
  }
  // 토큰 URL 디코딩
  token = decodeURIComponent(token);

  try {
    const response = await fetch("/saveAdminData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
      body: JSON.stringify({ title }), // 요청 본문에 title을 포함시킵니다.
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("Admin title saved successfully:", result);
  } catch (error) {
    console.error("Error saving admin title:", error);
    throw error; // 에러를 외부로 전파합니다.
  }
};
