import { useState } from "react";

const Popup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
  isOpen && (
    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-48 bg-white p-4 rounded-lg shadow-md">
      <div className="text-center mb-2">The toggle is on!</div>
      <button
        onClick={onClose}
        className="block w-full p-2 bg-gray-200 rounded-full"
      >
        Close
      </button>
    </div>
  );

const NewTalk = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleToggle = async () => {
    // 비동기 작업을 수행할 함수 호출
    if (!isPopupOpen) {
      await performAsyncAction(); // 비동기 작업 수행
    }
    setIsPopupOpen((prevState) => !prevState); // 팝업 상태 토글
  };

  // 비동기 작업을 수행할 함수
  const performAsyncAction = async () => {
    // 비동기 작업 수행 (예: API 호출 등)
    console.log("Async action performed!");
  };

  return (
    <div className="relative">
      <button onClick={handleToggle} className="p-2 bg-green-200 rounded-full">
        +
      </button>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default NewTalk;
