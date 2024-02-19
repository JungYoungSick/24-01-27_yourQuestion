// AdminTalkPlus.tsx
import React, { useState } from "react";

const AdminTalkPlus = ({ onClose }: { onClose: () => void }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddClick = () => {
    // 여기에 데이터베이스에 데이터를 추가하는 로직을 구현합니다.
    console.log("Added to database:", inputValue);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white p-4 rounded-lg shadow-md overflow-auto">
      <div className="flex justify-between mb-4">
        <button
          onClick={handleAddClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          추가하기
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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full p-2"
        placeholder="Enter data here..."
      />
    </div>
  );
};

export default AdminTalkPlus;
