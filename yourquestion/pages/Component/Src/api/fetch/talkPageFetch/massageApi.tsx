// 이 파일은 네트워크 요청 로직을 처리합니다.
// 이 함수들은 비동기 함수로 구현되어 있으며, 네트워크 요청이 완료된 후에 응답을 처리합니다. 요청이 실패하면 Error 객체를 throw하고, 요청이 성공하면 응답 데이터를 처리하여 반환합니다.
import { Message } from "../../../interface/massage";

export const fetchUserMessages = async (
  userID: string,
  title: string
): Promise<Message[]> => {
  const response = await fetch(
    `/talk/user?userID=${encodeURIComponent(userID)}&title=${encodeURIComponent(
      title
    )}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user messages");
  }
  const messages: Message[] = await response.json();
  return messages.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};

export const fetchAdminMessages = async (
  userID: string,
  title: string
): Promise<Message[]> => {
  const response = await fetch(
    `/talk/admin?userID=${encodeURIComponent(
      userID
    )}&title=${encodeURIComponent(title)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch admin messages");
  }
  const messages: Message[] = await response.json();
  return messages.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};
