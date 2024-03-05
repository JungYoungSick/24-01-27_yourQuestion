//! 해당 코드에서 토큰이 없으면 UI가 바뀌도록 수정필요.
// 외부 클릭 감지 커스텀 Hook (useOutsideClick)
// 이 훅을 사용하면 외부 클릭을 감지하여 원하는 작업을 수행할 수 있습니다. 예를 들어 모달이 열려 있을 때 모달 외부를 클릭하면 모달을 닫을 수 있도록 이 훅을 활용할 수 있습니다.
import { RefObject, useEffect } from "react";

const useOutsideClick = (ref: RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
