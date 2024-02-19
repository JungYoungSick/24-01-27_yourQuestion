import { useState } from "react";
import AdminTalkPlus from "./newTalkTogle/adminTalkPlus";

// NewTalk에서 사용할 Popup 컴포넌트를 정의합니다.
const Popup = ({
  isOpen,
  children,
  onClose,
}: {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}) =>
  isOpen && (
    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-48 bg-white p-4 rounded-lg shadow-md">
      <div className="text-center mb-2">{children}</div>
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
  const [isAdminTalkPlusOpen, setIsAdminTalkPlusOpen] = useState(false);

  const handleToggle = () => {
    setIsPopupOpen((prevState) => !prevState);
  };

  const openAdminTalkPlus = () => {
    setIsAdminTalkPlusOpen(true);
    setIsPopupOpen(false); // AdminTalkPlus를 열 때 NewTalk 팝업을 닫습니다.
  };

  return (
    <div className="relative">
      <button onClick={handleToggle} className="p-2 bg-green-200 rounded-full">
        +
      </button>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div
          onClick={openAdminTalkPlus}
          className="cursor-pointer bg-slate-300 m-3"
        >
          답변자 기록 추가
        </div>
      </Popup>
      {isAdminTalkPlusOpen && (
        <AdminTalkPlus onClose={() => setIsAdminTalkPlusOpen(false)} />
      )}
    </div>
  );
};

export default NewTalk;
