// TitleDisplay.tsx
import React from "react";

interface TitleDisplayProps {
  title: string;
}

const TitleDisplay: React.FC<TitleDisplayProps> = ({ title }) => {
  return (
    <div className="relative bg-slate-400 p-4 rounded-lg shadow-lg max-w-sm text-black">
      <div className="bg-white p-3 rounded-lg text-black">
        <h2>{title || "대화제목을 선택하세요."}</h2>
      </div>
      <div className="absolute -bottom-2 right-10 w-5 h-5 bg-slate-400 rotate-45 transform origin-top-left shadow-lg"></div>
    </div>
  );
};

export default TitleDisplay;
