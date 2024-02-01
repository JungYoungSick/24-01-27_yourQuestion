"use client";
import React, { useState } from "react";
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
  const [inputValue, setInputValue] = useState<string>("");

  // 입력값을 서버로 전송하는 함수입니다.
  const handleSubmit = async () => {
    try {
      const response = await fetch("/nosql/mongodb", {
        // 여기에 적절한 엔드포인트를 사용합니다.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputValue }), // 서버에 보낼 데이터를 JSON 형태로 변환합니다.
      });
      const data = await response.json();
      console.log(data); // 서버 응답을 콘솔에 출력합니다.
    } catch (error) {
      console.error("서버로 데이터를 전송하는 중 오류가 발생했습니다:", error);
    }
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
          텍스트 내용이 여기에 들어갑니다.
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
            onClick={handleSubmit} // 버튼을 클릭하면 handleSubmit 함수를 호출합니다.
          >
            ➡️
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
