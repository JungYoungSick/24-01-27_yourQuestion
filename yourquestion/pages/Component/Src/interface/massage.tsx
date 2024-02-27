// src/interfaces/Message.ts

export type MessageType = "user" | "admin"; // MessageType 타입 정의를 내보냅니다.

export interface Message {
  // Message 인터페이스를 내보냅니다.
  type: MessageType;
  text: string;
  sequenceNumber: number;
  timestamp: Date;
}
