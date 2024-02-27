import { Request, Response } from "express";
import { connectToMysql } from "../../server";

export async function getTitlesByUserID(
  req: Request,
  res: Response
): Promise<void> {
  const userID = req.params.userID; // 또는 토큰에서 추출한 userID
  const connection = await connectToMysql();

  try {
    const [rows] = await connection.query(
      "SELECT title FROM talkdata WHERE userID = ?",
      [userID]
    );
    res.json({ success: true, title: rows });
  } catch (error) {
    res.status(500).json({ success: false });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
