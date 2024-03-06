// TitleDisplay.tsx
import React from "react";

interface TitleDisplayProps {
  title: string;
  userID: string;
}

const TitleDisplay: React.FC<TitleDisplayProps> = ({ title }) => {
  return (
    <div className="title-display">
      <h2>{title}</h2>
    </div>
  );
};

export default TitleDisplay;
