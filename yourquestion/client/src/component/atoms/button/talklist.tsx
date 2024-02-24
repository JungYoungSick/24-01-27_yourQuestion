"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Talk from "./talk";

interface Talk {
  id: string;
  title: string;
  // ...기타 필드들이 있을 수 있음...
}
export const TalkList: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [talkData, setTalkData] = useState<Talk[]>([]);

  useEffect(() => {
    const fetchTalkData = async () => {
      try {
        const response = await axios.get("/title/talkdata");
        setTalkData(response.data);
      } catch (error) {
        console.error("talkdata를 불러오는데 실패했습니다.", error);
      }
    };

    fetchTalkData();
  }, []);

  const handleListOpenClick = () => {
    setIsPopupOpen(true);
  };

  const handleListCloseClick = () => {
    setIsPopupOpen(false);
  };
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
    <>
      <button
        className="p-2 bg-blue-200 rounded-full"
        onClick={handleListOpenClick}
      >
        🗓️
      </button>
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-15 flex justify-end items-start"
          onClick={handleListCloseClick}
        >
          <div
            className="bg-white p-4 w-1/2 mt-14 mr-10  h-4/5 rounded-lg shadow-lg max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              {/* 팝업 닫기 버튼 */}
              <button onClick={handleListCloseClick} className="text-xl">
                📌
              </button>
            </div>
            <ul>
              {talkData.map((data) => (
                <li key={data.id}>
                  <Link href={`/talk/${data.id}`}>{data.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default TalkList;
