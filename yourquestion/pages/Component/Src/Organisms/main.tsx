import React from "react";
import TitleDisplay from "../Atoms/button/titleDisplay";

interface MainProps {
  adminData: string;
  title: string;
}

const Main: React.FC<MainProps> = ({ adminData, title }) => {
  return (
    <main className="flex-grow p-4 flex justify-between">
      <div className="flex flex-col items-end ml-4">
        <TitleDisplay title={title} />
        <div className="text-black my-4">캐릭터 이미지</div>
      </div>
      <div className="w-2/3 h-5/6 p-4 bg-white rounded-lg shadow text-black">
        {adminData}
      </div>
    </main>
  );
};

export default Main;
