import { Request, Response } from "express";
import { getAdminMessages } from "./userIdTitle"; // getAdminMessages도 임포트합니다.

export const getAdminIDTitle = async (req: Request, res: Response) => {
  try {
    const { userID, title } = req.query as { userID: string; title: string };
    const messages = await getAdminMessages(userID, title); // getUserMessages 대신 getAdminMessages를 호출합니다.
    res.json(messages);
  } catch (error: any) {
    console.error("Failed to retrieve admin messages:", error); // 오류 메시지도 'user messages'에서 'admin messages'로 변경
    res.status(500).send(error.message);
  }
};
