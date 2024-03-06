// 사용자 입력을 처리하는 유틸리티 함수인 handleUserInput입니다. 이 함수는 다음과 같은 작업을 수행
// 이러한 유틸리티 함수는 사용자 입력을 처리하고, 필요한 경우 팝업을 열거나 서버로 데이터를 전송하는 등의 작업을 수행합니다.
export const handleUserInput = async (
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleSubmit: () => Promise<void>
): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) {
    //! 기능고장
    setIsPopupOpen(true);
    return;
  }
  await handleSubmit();
};
