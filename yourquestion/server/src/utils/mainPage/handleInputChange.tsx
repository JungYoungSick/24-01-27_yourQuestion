// utils/handleInputChange.ts
import { ChangeEvent } from "react";

export const handleInputChange = (
  event: ChangeEvent<HTMLInputElement>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>
): void => {
  setInputValue(event.target.value);
};
