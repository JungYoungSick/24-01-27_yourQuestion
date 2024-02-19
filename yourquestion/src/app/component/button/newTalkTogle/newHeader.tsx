// NewHeader.tsx
import React, { useState } from "react";

const NewHeader = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [headerInputValue, setHeaderInputValue] = useState("");

  const handleHeaderAction = () => {
    // 헤더 관련 작업을 여기서 처리합니다.
    console.log("Header action performed with:", headerInputValue);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white p-4 rounded-lg shadow-md overflow-auto">
      <div className="flex justify-between mb-4">
        <button
          onClick={handleHeaderAction}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          제목 추가
        </button>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          닫기
        </button>
      </div>
      <input
        type="text"
        value={headerInputValue}
        onChange={(e) => setHeaderInputValue(e.target.value)}
        className="w-full p-2"
        placeholder="Header input..."
      />
    </div>
  );
};

export default NewHeader;
