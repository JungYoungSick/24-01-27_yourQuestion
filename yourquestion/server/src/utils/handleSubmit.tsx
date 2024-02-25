// utils/handleSubmit.ts
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
