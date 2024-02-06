"use client";
// src/components/Talk.tsx
import React, { useState, useEffect } from "react";

type MessageType = "user" | "bot";

interface Message {
  type: MessageType;
  text: string;
  timestamp: Date;
}

export const Talk: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 서버에서 메시지 목록을 가져오는 함수
  const fetchMessages = async () => {
    try {
      const response = await fetch("/talk?message=user");
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const fetchedMessages = await response.json();
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // 컴포넌트가 마운트되었을 때와 팝업이 열릴 때 메시지를 가져옵니다.
  useEffect(() => {
    if (isPopupOpen) {
      fetchMessages(); // 팝업이 열릴 때 최신 메시지를 가져옵니다.
      const intervalId = setInterval(fetchMessages, 5000); // 5초마다 메시지를 가져옵니다.
      return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌을 제거합니다.
    }
  }, [isPopupOpen]);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <>
      <button className="p-2 bg-red-200 rounded-full" onClick={togglePopup}>
        💬
      </button>{" "}
      {/* 팝업 토글 버튼 */}
      {isPopupOpen && ( // 팝업 상태에 따라 조건부 렌더링
        <div className="fixed inset-0 bg-black bg-opacity-15 flex justify-end items-start">
          <div className="bg-white p-4 w-1/2 mt-14 mr-10  h-4/5 rounded-lg shadow-lg max-w-md">
            <div className="flex justify-end">
              {/* 팝업 닫기 버튼 */}
              <button onClick={togglePopup} className="text-xl">
                📌
              </button>
            </div>
            <ul>
              {messages.map((message, index) => (
                <li
                  key={index}
                  className={`message ${
                    message.type === "user" ? "user-message" : "bot-message"
                  }`}
                >
                  {message.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Talk;
