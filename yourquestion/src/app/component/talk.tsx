"use client";
// src/components/Talk.tsx
import React, { useState } from "react";

type MessageType = "user" | "bot";

interface Message {
  type: MessageType;
  text: string;
}

export const Talk: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태 관리

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // 팝업 상태 토글
  };
  // 새로운 사용자 질문을 추가하는 함수
  const addNewUserQuestion = (questionText: string) => {
    const newQuestion: Message = { type: "user", text: questionText };
    setMessages((prevMessages) => [...prevMessages, newQuestion]);

    // TODO: 여기서 답변자의 대답 로직을 추가
  };

  // 새로운 답변자의 대답을 추가하는 함수
  const addNewBotResponse = (responseText: string) => {
    const newResponse: Message = { type: "bot", text: responseText };
    setMessages((prevMessages) => [...prevMessages, newResponse]);
  };

  // 메시지 렌더링
  const renderMessages = () =>
    messages.map((message, index) => (
      <div
        key={index}
        className={`message ${
          message.type === "user" ? "user-message" : "bot-message"
        }`}
      >
        {message.text}
      </div>
    ));

  return (
    <>
      <button className="p-2 bg-red-200 rounded-full" onClick={togglePopup}>
        💬
      </button>{" "}
      {/* 팝업 토글 버튼 */}
      {isPopupOpen && ( // 팝업 상태에 따라 조건부 렌더링
        <div className="fixed inset-0 bg-black bg-opacity-15 flex justify-end items-start">
          <div className="bg-white w-1/2 h-4/5 mt-14 mr-10 rounded-lg shadow-lg max-w-md">
            <div
              className="w-11/12 h-16
            flex justify-end items-center"
            >
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
