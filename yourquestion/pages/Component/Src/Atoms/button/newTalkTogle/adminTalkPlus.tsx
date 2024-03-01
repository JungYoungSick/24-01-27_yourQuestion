import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AdminTalkPlus: React.FC<Props> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const addDataToMongoDB = async (data: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch("/newTalk/adminTalkPlus/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${encodeURIComponent(token)}`,
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Data successfully saved:", result);
      setInputValue(""); // Clear the input field
      onClose(); // Close the popup
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };
  const handleAddClick = () => {
    addDataToMongoDB(inputValue);
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
