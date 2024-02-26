// db/mysql/controllers/getTitleTalkData.ts

import { Request, Response } from "express";
import { connectToMysql } from "../../server";

export const getTitleTalkData = async (
  req: Request,
  res: Response
): Promise<void> => {
  // MariaDB 연결 시도
  const connection = await connectToMysql();

  // 연결 실패 시 오류 응답
  if (!connection) {
    res.status(500).json({ message: "MariaDB 연결 실패" });
    return;
  }

  // talkdata 테이블에서 모든 id와 title 조회 쿼리
  const query = "SELECT id, title FROM talkdata";

  try {
    // 쿼리 실행
    const [titles] = await connection.query(query);

    // 조회된 데이터 응답 반환
    res.status(200).json(titles);
  } catch (error) {
    // 쿼리 실행 중 오류 발생 시
    console.error("Title 데이터 조회 실패", error);
    res.status(500).json({ message: "Title 데이터 조회 중 오류 발생", error });
  } finally {
    // 데이터베이스 연결 종료
    if (connection) {
      connection.end();
    }
  }
};
