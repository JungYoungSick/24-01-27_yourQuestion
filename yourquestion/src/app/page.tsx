"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// 동적으로 컴포넌트를 불러옵니다. 서버 사이드 렌더링을 비활성화합니다.
const LoginPopup = dynamic(() => import("@/app/component/button/loginpopup"), {
  ssr: false,
});
const TalkList = dynamic(() => import("@/app/component/button/talklist"), {
  ssr: false,
});
const Talk = dynamic(() => import("@/app/component/button/talk"), {
  ssr: false,
});

const MainPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>(""); // user 컬렉션 데이터를 저장할 상태
  const [adminData, setAdminData] = useState<string>(""); // admin 컬렉션 데이터를 저장할 상태
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
        setAdminData(searchData[0].text); // 첫 번째 검색 결과를 상태에 저장합니다.
        console.log("User 데이터 저장 완료");
      } else {
        setAdminData("조회할 데이터가 없습니다."); // 검색 결과가 없으면 메시지를 표시합니다.
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setAdminData("Error fetching data");
    }
  };

  // MongoDB 'admin' 컬렉션에서 데이터를 가져오는 함수입니다.
  const fetchAdminData = async () => {
    try {
      const response = await fetch("/nosql/mongodb?collection=admin");
      const data = await response.json();
      console.log(data); // 조회된 데이터를 콘솔에 출력
      // 여기서 반환된 데이터를 상태에 저장하거나 UI에 표시하는 로직 추가
      console.log("여기다");
    } catch (error) {
      console.error(
        "MongoDB로부터 데이터를 조회하는 중 오류가 발생했습니다:",
        error
      );
    }
  };

  useEffect(() => {
    fetchAdminData(); // 컴포넌트가 마운트될 때 admin 데이터를 조회합니다.
  }, []); // 빈 의존성 배열을 통해 컴포넌트 마운트 시 한 번만 실행되도록 합니다.

  const handleUserInput = async () => {
    await handleSubmit(); // 기존의 데이터 전송 로직을 유지합니다.
    await fetchAdminData(); // 데이터 전송 후 admin 데이터를 새로 조회합니다.
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
