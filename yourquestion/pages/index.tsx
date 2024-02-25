import React, { useState } from "react";
import Header from "./Component/Src/Organisms/header";
import Main from "./Component/Src/Organisms/main";
import Footer from "./Component/Src/Organisms/footer";

const MainPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [adminData, setAdminData] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 사용자 입력을 저장하는 함수
  const saveUserInput = async (input: string) => {
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

  // admin 컬렉션에서 데이터를 검색하고 저장하는 함수
  const handleSubmit = async () => {
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
        saveSearchResultToAdmin(searchData[0].text);
      } else {
        setAdminData("조회할 데이터가 없습니다.");
        saveSearchResultToAdmin("조회할 데이터가 없습니다.");
      }
      // 사용자 입력값 저장
      saveUserInput(inputValue);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setAdminData("Error fetching data");
    }
  };

  // 검색 결과를 admin 컬렉션에 저장하는 함수
  const saveSearchResultToAdmin = async (data: string) => {
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

  // 사용자 입력 처리 함수
  const handleUserInput = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsPopupOpen(true);
      return;
    }
    await handleSubmit();
  };

  // 입력값 변경 처리 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-pink-100">
      <Header />
      <Main adminData={adminData} />
      <Footer
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleUserInput={handleUserInput}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
      />
    </div>
  );
};

export default MainPage;
