import React from "react";
import TitleDisplay from "../Atoms/button/titleDisplay";
import Image from "next/image";
import Dog from "../assets/image/Dog.webp";
interface MainProps {
  adminData: string;
  title: string;
}

const Main: React.FC<MainProps> = ({ adminData, title }) => {
  return (
    <main className="flex-grow p-4 flex justify-between">
      <div className="flex flex-col items-end ml-4">
        <div className="text-black my-4">
          <div className="mt-24">
            <TitleDisplay title={title} />
          </div>
          <Image src={Dog} alt="Dog" className="w-96 h-96 ml-20 mt-12" />
        </div>
      </div>
      <div className="w-2/3 h-5/6 p-4 bg-slate-400">
        <div className="w-full h-full p-4 bg-white rounded-lg shadow text-black">
          {adminData}
        </div>
      </div>
    </main>
  );
};

export default Main;
