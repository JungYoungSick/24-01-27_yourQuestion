// TitleDisplay.tsx
import React from "react";

interface TitleDisplayProps {
  title: string;
  userID: string;
}

const TitleDisplay: React.FC<TitleDisplayProps> = ({ title }) => {
  return (
    <div className="title-display">
      <h2>{title || "대화제목을 선택하세요."}</h2>
    </div>
  );
};

export default TitleDisplay;
