import { useState } from "react";
import AdminTalkPlus from "./newTalkTogle/adminTalkPlus";
import NewHeader from "./newTalkTogle/newHeader";

const NewTalk = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 토글 팝업 상태 관리
  const [isAdminTalkPlusOpen, setIsAdminTalkPlusOpen] = useState(false);
  const [isNewHeaderOpen, setIsNewHeaderOpen] = useState(false);

  const handleToggle = () => {
    setIsPopupOpen(!isPopupOpen); // 토글 상태 토글
    // 팝업을 닫을 때 AdminTalkPlus와 NewHeader도 닫히도록 설정
    if (isPopupOpen) {
      setIsAdminTalkPlusOpen(false);
      setIsNewHeaderOpen(false);
    }
  };

  const handleAdminTalkPlusOpen = () => {
    setIsAdminTalkPlusOpen(true);
    setIsNewHeaderOpen(false);
    setIsPopupOpen(false); // AdminTalkPlus를 열 때 토글 팝업 닫기
  };

  const handleNewHeaderOpen = () => {
    setIsAdminTalkPlusOpen(false);
    setIsNewHeaderOpen(true);
    setIsPopupOpen(false); // NewHeader를 열 때 토글 팝업 닫기
  };

  return (
    <div className="relative">
      <button onClick={handleToggle} className="p-2 bg-green-200 rounded-full">
        +
      </button>

      {isPopupOpen && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-48 bg-white p-4 rounded-lg shadow-md">
          <div
            className="text-center mb-2 cursor-pointer"
            onClick={handleAdminTalkPlusOpen}
          >
            답변자 기록 추가
          </div>
          <div
            className="text-center mb-2 cursor-pointer"
            onClick={handleNewHeaderOpen}
          >
            새로운 대화 생성
          </div>
        </div>
      )}

      {isAdminTalkPlusOpen && (
        <AdminTalkPlus onClose={() => setIsAdminTalkPlusOpen(false)} />
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
