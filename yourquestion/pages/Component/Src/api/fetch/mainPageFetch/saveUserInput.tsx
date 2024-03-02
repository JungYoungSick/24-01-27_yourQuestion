// 코드는 사용자 입력을 저장하는 함수인 saveUserInput입니다. 이 함수는 입력된 텍스트를 서버에 전송하여 MongoDB에 저장합니다.
export const saveUserInput = async (input: string): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("로그인이 필요합니다.");
    return;
  }
  try {
    const response = await fetch("/nosql/mongodb/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
      body: JSON.stringify({ text: input }),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    console.log("사용자 입력 데이터 저장 완료");
  } catch (error) {
    console.error("사용자 입력 데이터 저장 실패:", error);
  }
};
