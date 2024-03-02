// 코드는 사용자의 입력을 처리하고 관리자 데이터를 조회하여 관리자 데이터를 설정하고, 검색 결과를 admin 컬렉션에 저장하고, 사용자 입력 데이터를 저장하는 함수인 handleSubmit입니다.

export const handleSubmit = async (
  inputValue: string,
  setAdminData: React.Dispatch<React.SetStateAction<string>>,
  saveSearchResultToAdmin: (data: string) => Promise<void>,
  saveUserInput: (input: string) => Promise<void>
): Promise<void> => {
  try {
    const response = await fetch("/nosql/searchAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword: inputValue }),
    });
    const searchData = await response.json();
    if (searchData.length > 0) {
      setAdminData(searchData[0].text);
      await saveSearchResultToAdmin(searchData[0].text);
    } else {
      setAdminData("조회할 데이터가 없습니다.");
      await saveSearchResultToAdmin("조회할 데이터가 없습니다.");
    }
    await saveUserInput(inputValue);
  } catch (error) {
    console.error("Error fetching admin data:", error);
    setAdminData("Error fetching data");
  }
};
