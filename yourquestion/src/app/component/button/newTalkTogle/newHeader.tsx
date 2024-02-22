// NewHeader.tsx
import React, { useState } from "react";

function decodeJwt(token: string): any {
  const base64Url = token.split(".")[1]; // 토큰의 payload 부분을 추출
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload); // payload를 객체로 파싱하여 반환
}

const NewHeader = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");

  const addTitle = async () => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
    if (!token) {
      console.error("토큰이 없습니다.");
      return;
    }

    // 토큰에서 userID 추출
    const decodedToken = decodeJwt(token);
    console.log("Decoded Token:", decodedToken); // 디코딩된 토큰 전체를 콘솔에 출력
    console.log("UserID:", decodedToken.userID); // 토큰에서 추출한 userID를 콘솔에 출력
    try {
      const response = await fetch("/newTalk/newHeader/title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 토큰을 포함하는 경우, Authorization 헤더에 추가
          Authorization: "Bearer your-token-here",
        },

        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setTitle("");
      onClose();
    } catch (error) {
      console.error("Failed to add title:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white p-4 rounded-lg shadow-md overflow-auto">
      <div className="flex justify-between mb-4">
        <button
          onClick={addTitle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          헤더 동작
        </button>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          닫기
        </button>
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title here..."
        className="w-full p-2"
      />
    </div>
  );
};

export default NewHeader;
