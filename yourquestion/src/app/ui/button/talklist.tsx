"use client";
import React, { useState } from "react";

export const TalkList: React.FC = () => {
  // 리스트 아이템의 상태를 관리하는 state
  const [items, setItems] = useState([
    // 초기 아이템 예시
    { id: 1, title: "대화 1", fixed: false },
    { id: 2, title: "대화 2", fixed: false },
    // 더 많은 아이템...
  ]);

  // 위치 변경, 삭제, 고정 함수 (실제 구현 필요)
  const handleMove = (itemId: number, direction: "up" | "down") => {
    // 아이템의 위치를 변경하는 로직
  };

  const handleDelete = (itemId: number) => {
    // 아이템을 삭제하는 로직
  };

  const handlePin = (itemId: number) => {
    // 아이템을 고정하는 로직
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-end">
          {/* 팝업 닫기 버튼 */}
          <button className="text-xl">✖️</button>
        </div>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center my-2 p-2 bg-gray-100"
            >
              <span>{item.title}</span>
              {/* 위치 변경, 삭제, 고정 버튼 */}
              <div className="flex space-x-2">
                <button onClick={() => handleMove(item.id, "up")}>↑</button>
                <button onClick={() => handleMove(item.id, "down")}>↓</button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500"
                >
                  🗑️
                </button>
                <button
                  onClick={() => handlePin(item.id)}
                  className="text-green-500"
                >
                  {item.fixed ? "📌" : "📍"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TalkList;
