// 코드는 사용자의 입력을 처리하고 관리자 데이터를 조회하여 관리자 데이터를 설정하고, 검색 결과를 admin 컬렉션에 저장하고, 사용자 입력 데이터를 저장하는 함수인 handleSubmit입니다.

export const handleSubmit = async (
  inputValue: string,
  title: string,
  setAdminData: React.Dispatch<React.SetStateAction<string>>,
  saveSearchResultToAdmin: (data: string, title: string) => Promise<void>,
  saveUserInput: (input: string, title: string) => Promise<void>
): Promise<void> => {
  try {
    const response = await fetch("/nosql/searchAdminSaveData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword: inputValue }),
    });
    const searchData = await response.json();
    if (searchData.length > 0) {
      setAdminData(searchData[0].text);
      await saveSearchResultToAdmin(searchData[0].text, title);
    } else {
      const noDataText = "조회할 데이터가 없습니다.";
      setAdminData(noDataText);
      await saveSearchResultToAdmin(noDataText, title);
    }
    await saveUserInput(inputValue, title);
  } catch (error) {
    console.error("Error fetching admin data:", error);
    setAdminData("Error fetching data");
  }
};
