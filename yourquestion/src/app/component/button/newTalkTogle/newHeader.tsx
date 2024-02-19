// NewHeader.tsx
import React, { useState } from "react";

const NewHeader = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");

  const addTitle = async () => {
    try {
      const response = await fetch("/newTalk/newHeader/title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 토큰을 포함하는 경우, Authorization 헤더에 추가
          Authorization: "Bearer your-token-here",
        },

        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        console.log("1번");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("2번");
      setTitle("");
      onClose();
    } catch (error) {
      console.log("3번");
      console.error("Failed to add title:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white p-4 rounded-lg shadow-md overflow-auto">
      <div className="flex justify-between mb-4">
        <button
          onClick={addTitle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          헤더 동작
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title here..."
        className="w-full p-2"
      />
    </div>
  );
};

export default NewHeader;
