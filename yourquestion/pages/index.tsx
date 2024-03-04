import React, { useState } from "react";
import Header from "./Component/Src/Organisms/header";
import Main from "./Component/Src/Organisms/main";
import Footer from "./Component/Src/Organisms/footer";
import { saveUserInput as saveUserInputUtil } from "./Component/Src/api/fetch/mainPageFetch/saveUserInput";
import { handleSubmit as handleSubmitUtil } from "./Component/Src/api/fetch/mainPageFetch/handleSubmit";
import { saveSearchResultToAdmin } from "./Component/Src/api/fetch/mainPageFetch/saveSearchResultToAdmin";
import { handleUserInput as handleUserInputUtil } from "./Component/Src/Molecules/handleUserInput";
import { handleInputChange as handleInputChangeUtil } from "./Component/Src/Molecules/handleInputChange";

export interface MainPageProps {
  title: string;
}

const MainPage: React.FC<MainPageProps> = ({ title }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [adminData, setAdminData] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 입력값 변경 처리 함수
  const customHandleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleInputChangeUtil(event, setInputValue);
  };

  // 사용자 입력 처리 함수
  const customHandleUserInput = async (): Promise<void> => {
    await handleUserInputUtil(setIsPopupOpen, () =>
      handleSubmitUtil(
        inputValue,
        title,
        setAdminData,
        saveSearchResultToAdmin,
        saveUserInputUtil
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-pink-100">
      <Header title={title} />
      <Main adminData={adminData} title={title} />
      <Footer
        inputValue={inputValue}
        handleInputChange={customHandleInputChange}
        handleUserInput={customHandleUserInput}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        title={title}
      />
    </div>
  );
};

export default MainPage;
