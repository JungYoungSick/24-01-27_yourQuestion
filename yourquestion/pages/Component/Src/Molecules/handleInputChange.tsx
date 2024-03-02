// 입력값이 변경될 때 호출되는 handleInputChange 유틸리티 함수
// 입력값이 변경될 때마다 반복적으로 사용되며, 이벤트 핸들러 함수 내에서 불필요한 중복을 피하기 위해 분리되어 사용됩니다.
import { ChangeEvent } from "react";

export const handleInputChange = (
  event: ChangeEvent<HTMLInputElement>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>
): void => {
  setInputValue(event.target.value);
};
