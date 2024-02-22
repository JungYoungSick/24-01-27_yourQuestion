"use client";
import React, { useState, useEffect } from "react";

interface TitleData {
  title: string;
}

const TitleDisplay: React.FC = () => {
  const [title, setTitle] = useState<string>("로그인을 해주세요");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/lastTitle", {
        // 사용자의 마지막 대화 타이틀을 조회하는 서버의 엔드포인트를 가정합니다.
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data: TitleData) => {
          if (data && data.title) {
            setTitle(data.title); // 서버로부터 받은 마지막 대화 타이틀을 설정
          }
        })
        .catch((error) => console.error("Error fetching last title:", error));
    }
  }, []);

  return (
    <div className="inline-block mt-5 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    </div>
  );
};

export default TitleDisplay;
