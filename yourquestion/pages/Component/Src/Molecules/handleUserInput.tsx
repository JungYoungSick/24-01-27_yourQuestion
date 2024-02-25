// utils/handleUserInput.ts
export const handleUserInput = async (
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleSubmit: () => Promise<void>
): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) {
    setIsPopupOpen(true);
    return;
  }
  await handleSubmit();
};
