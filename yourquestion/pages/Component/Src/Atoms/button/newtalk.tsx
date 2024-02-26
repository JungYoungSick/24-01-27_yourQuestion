import { useState, useEffect, useRef } from "react";
import AdminTalkPlus from "./newTalkTogle/adminTalkPlus";
import NewHeader from "./newTalkTogle/newHeader";

const NewTalk = () => {
  const [isAdminTalkPlusOpen, setIsAdminTalkPlusOpen] = useState(false);
  const [isNewHeaderOpen, setIsNewHeaderOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // useRef에 대한 타입을 HTMLDivElement | null로 명시적으로 선언합니다.
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleAdminTalkPlusOpen = () => {
    setIsAdminTalkPlusOpen(true);
    setIsNewHeaderOpen(false);
    setIsPopupOpen(false);
  };

  const handleNewHeaderOpen = () => {
    setIsAdminTalkPlusOpen(false);
    setIsNewHeaderOpen(true);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    // 'event' 매개 변수의 타입을 MouseEvent로 명시합니다.
    const handleClickOutside = (event: MouseEvent) => {
      // 'event.target'을 'Node'로 타입 단언합니다.
      const target = event.target as Node;
      if (popupRef.current && !popupRef.current.contains(target)) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button onClick={handleToggle} className="p-2 bg-green-200 rounded-full">
        +
      </button>

      {isPopupOpen && (
        <div
          ref={popupRef}
          className="absolute top-12 left-1/2 transform -translate-x-1/2 w-48 bg-white p-4 rounded-lg shadow-md"
        >
          <div
            className="text-center mb-2 cursor-pointer"
            onClick={handleAdminTalkPlusOpen}
          >
            Admin Talk Plus
          </div>
          <div
            className="text-center mb-2 cursor-pointer"
            onClick={handleNewHeaderOpen}
          >
            New Header
          </div>
        </div>
      )}

      {isAdminTalkPlusOpen && (
        <AdminTalkPlus
          isOpen={isAdminTalkPlusOpen}
          onClose={() => setIsAdminTalkPlusOpen(false)}
        />
      )}

      {isNewHeaderOpen && (
        <NewHeader
          isOpen={isNewHeaderOpen}
          onClose={() => setIsNewHeaderOpen(false)}
        />
      )}
    </div>
  );
};

export default NewTalk;
