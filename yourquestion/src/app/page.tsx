"use client";
import React, { useState } from "react";
import LoginPopup from "./component/button/loginpopup";
import TalkList from "./component/button/talklist";
import Talk from "./component/button/talk";

const MainPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>(""); // user 컬렉션 데이터를 저장할 상태
  const [adminData, setAdminData] = useState<string>(""); // admin 컬렉션 데이터를 저장할 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const saveUserInput = async (input: string | number) => {
    try {
      await fetch("/nosql/mongodb/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });
    } catch (error) {
      console.error("사용자 입력 데이터 저장 실패:", error);
    }
  };

  // 입력값을 서버로 전송하고 admin 컬렉션에서 데이터를 검색하는 함수입니다.
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
        setAdminData(searchData[0].text); // 첫 번째 검색 결과를 상태에 저장
        console.log("User 데이터 저장 완료");
        saveSearchResultToAdmin(searchData[0].text); // 검색 결과를 admin 컬렉션에 저장
      } else {
        setAdminData("조회할 데이터가 없습니다."); // 검색 결과가 없으면 메시지를 표시합니다.
        saveSearchResultToAdmin("조회할 데이터가 없습니다."); // 메시지를 admin 컬렉션에 저장
      }
      saveUserInput(inputValue); // 사용자 입력값을 user 컬렉션에 저장
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setAdminData("Error fetching data");
    }
  };

  // 검색된 데이터를 admin 컬렉션에 저장하는 함수
  const saveSearchResultToAdmin = async (data: string | number) => {
    try {
      await fetch("/nosql/mongodb/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: data }),
      });
      console.log("찾아온 데이터를 저장합니다.");
    } catch (error) {
      console.error("Failed to save search result to admin collection:", error);
    }
  };

  const handleUserInput = async () => {
    const token = localStorage.getItem("token");

    // 토큰이 없다면 LoginPopup 팝업을 표시합니다.
    if (!token) {
      setIsPopupOpen(true); // 팝업을 여는 상태로 설정합니다.
      return;
    }

    // 토큰이 있다면 (즉, 로그인 상태라면) 데이터 전송 로직을 실행합니다.
    await handleSubmit();
  };

  // 입력창의 값이 변경될 때마다 실행되는 함수입니다.
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // 입력값 상태를 업데이트합니다.
  };
  return (
    <div className="flex flex-col h-screen bg-pink-100">
      <header className="flex justify-between p-4">
        <div className="flex space-x-4">
          {/* 10시 방향 UI (로그인 결과 UI) */}
          <LoginPopup />
        </div>
        <div className="flex space-x-2">
          {/* 1시 방향 UI (추가, 달력, 채팅 버튼) */}
          <button className="p-2 bg-green-200 rounded-full">+</button>
          <TalkList />
          <Talk />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow p-4">
        {/* 말풍선 */}
        <div className="p-4 bg-white rounded-lg shadow max-w-sm mx-auto text-black">
          {adminData} {/* admin 컬렉션으로부터 조회된 데이터를 표시합니다. */}
        </div>
        {/* 캐릭터 이미지 (임시로 텍스트로 대체) */}
        <div className="mx-auto my-4 text-black">캐릭터 이미지</div>
      </main>

      {/* Footer section */}
      <footer className="p-4 bg-gray-200">
        {/* 프롬프트 입력창 */}
        <LoginPopup
          showButton={false}
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
        <div className="flex items-center">
          <input
            type="text"
            placeholder="문구 입력..."
            className="flex-grow p-2 rounded-l text-black"
            value={inputValue} // 입력창의 상태를 value로 설정합니다.
            onChange={handleInputChange} // 입력창의 값이 변경될 때마다 handleInputChange 함수를 호출합니다.
          />
          <button
            className="p-2 bg-yellow-300 rounded-r"
            onClick={handleUserInput} // 버튼을 클릭하면 handleSubmit 함수를 호출합니다.
          >
            ➡️
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
