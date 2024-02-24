"use client";
// src/components/Talk.tsx
import React, { useState, useEffect } from "react";

type MessageType = "user" | "admin";

interface Message {
  type: MessageType;
  text: string;
  sequenceNumber: number;
  timestamp: Date;
}

export const Talk: React.FC = () => {
  const [userMessages, userSetMessages] = useState<Message[]>([]);
  const [adminMessages, adminSetMessages] = useState<Message[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // 메시지 배열을 결합하고 sequenceNumber로 정렬하는 로직
  const combinedMessages = [...userMessages, ...adminMessages].sort(
    (a, b) => a.sequenceNumber - b.sequenceNumber
  );

  // 서버에서 유저메시지 목록을 가져오는 함수
  const fetchUserMessages = async () => {
    try {
      const response = await fetch("/talk/user?message=user");
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const fetchedUserMessages = await response.json();
      // timestamp를 기준으로 메시지를 오름차순 정렬
      fetchedUserMessages.sort(
        (a: Message, b: Message) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      userSetMessages(fetchedUserMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };
  // 서버에서 답변자메시지 목록을 가져오는 함수
  const fetchAdminMessages = async () => {
    try {
      const response = await fetch("/talk/admin?message=admin");
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const fetchedAdminMessages = await response.json();
      // timestamp를 기준으로 메시지를 오름차순 정렬
      fetchedAdminMessages.sort(
        (a: Message, b: Message) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      adminSetMessages(fetchedAdminMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      // 팝업이 열릴 때 최신 메시지를 가져옵니다.
      fetchUserMessages();
      fetchAdminMessages();

      // user 메시지를 가져오는 인터벌 설정
      const intervalUser = setInterval(fetchUserMessages, 5000);
      // admin 메시지를 가져오는 인터벌 설정
      const intervalAdmin = setInterval(fetchAdminMessages, 5000);

      // 컴포넌트가 언마운트될 때 인터벌을 제거합니다.
      return () => {
        clearInterval(intervalUser);
        clearInterval(intervalAdmin);
      };
    }
    // isPopupOpen이 변경될 때마다 useEffect 훅을 실행합니다.
  }, [isPopupOpen]);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <>
      <button className="p-2 bg-red-200 rounded-full" onClick={togglePopup}>
        💬
      </button>{" "}
      {/* 팝업 토글 버튼 */}
      {isPopupOpen && ( // 팝업 상태에 따라 조건부 렌더링
        <div
          className="fixed inset-0 bg-black bg-opacity-15 flex justify-end items-start"
          onClick={togglePopup}
        >
          <div
            className="bg-white p-4 w-1/2 mt-14 mr-10  h-4/5 rounded-lg shadow-lg max-w-md "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              {/* 팝업 닫기 버튼 */}
              <button onClick={togglePopup} className="text-xl">
                📌
              </button>
            </div>
            {/* 전체 div */}
            <div className="flex mt-10 w-full h-5/6 overflow-y-auto whitespace-nowrap bg-gray-500">
              <div className="flex flex-col space-y-4 p-2">
                {combinedMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sequenceNumber % 2 === 0
                        ? "justify-end ml-auto w-11/12"
                        : "justify-start mr-auto w-11/12"
                    } items-start `}
                  >
                    <div
                      className={`rounded px-4 py-2 shadow text-white break-words overflow-y-auto whitespace-normal w-auto ${
                        message.sequenceNumber % 2 === 0
                          ? "bg-pink-300"
                          : "bg-blue-300"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Talk;
