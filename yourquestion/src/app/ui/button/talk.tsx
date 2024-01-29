// src/components/Talk.tsx
import React, { useState, useEffect } from "react";

type MessageType = "user" | "bot";

interface Message {
  type: MessageType;
  text: string;
}

export const Talk: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

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
    <div className="talk-popup">
      <div className="messages">{renderMessages()}</div>
      {/* TODO: 여기에 사용자 입력 필드와 전송 버튼을 추가 */}
    </div>
  );
};

export default Talk;
