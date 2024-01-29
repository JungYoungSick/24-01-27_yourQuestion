import React from "react";
import dynamic from "next/dynamic";

// 동적으로 컴포넌트를 불러옵니다. 서버 사이드 렌더링을 비활성화합니다.
const LoginPopup = dynamic(() => import("@/app/button/loginpopup"), {
  ssr: false,
});
const TalkList = dynamic(() => import("@/app/button/talklist"), {
  ssr: false,
});
const Talk = dynamic(() => import("@/app/button/talk"), {
  ssr: false,
});

const MainPage: React.FC = () => {
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
          />
          <button className="p-2 bg-yellow-300 rounded-r">➡️</button>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
