// utils/saveUserInput.ts
export const saveUserInput = async (input: string): Promise<void> => {
  try {
    const response = await fetch("/nosql/mongodb/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input }),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    console.log("사용자 입력 데이터 저장 완료");
  } catch (error) {
    console.error("사용자 입력 데이터 저장 실패:", error);
  }
};
