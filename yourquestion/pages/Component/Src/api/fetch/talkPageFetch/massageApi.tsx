// 이 파일은 네트워크 요청 로직을 처리합니다.
import { Message } from "../../../interface/massage";

export const fetchUserMessages = async (): Promise<Message[]> => {
  const response = await fetch("/talk/user?message=user");
  if (!response.ok) {
    throw new Error("Failed to fetch user messages");
  }
  const messages: Message[] = await response.json();
  return messages.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};

export const fetchAdminMessages = async (): Promise<Message[]> => {
  const response = await fetch("/talk/admin?message=admin");
  if (!response.ok) {
    throw new Error("Failed to fetch admin messages");
  }
  const messages: Message[] = await response.json();
  return messages.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};
