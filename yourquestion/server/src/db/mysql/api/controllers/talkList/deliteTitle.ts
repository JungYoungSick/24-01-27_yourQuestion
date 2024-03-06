import { Request, Response } from "express";
import { connectToMysql } from "../../../server"; // mariaDB 연결 설정 함수 가져오기
import { Connection } from "mysql2/promise"; // mysql2 모듈의 Promise 형식을 사용

const deleteTitle = async (title: string): Promise<void> => {
  try {
    // connectToMysql() 함수가 Promise<Connection>을 반환하므로 await를 사용하여 연결을 기다림
    const connection: Connection = await connectToMysql();
    const query = `DELETE FROM talkdata WHERE title = '${title}'`;

    // 프로미스를 사용하여 쿼리를 실행하고 결과를 반환
    const [results] = await connection.query(query);

    // 연결 종료
    await connection.end();

    // 성공적으로 삭제되었을 때 아무런 값도 반환하지 않음
    // 실패할 경우 오류를 던져서 호출자에게 알림
    return;
  } catch (error) {
    console.error("Error deleting title:", error);
    throw new Error("Internal server error");
  }
};

export const handleDeleteTitle = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title } = req.params;

  try {
    // deleteTitle 함수를 호출하여 title을 삭제하고 결과를 기다림
    await deleteTitle(title);

    // 성공적으로 삭제되었을 때 200 상태 코드와 메시지를 반환
    res.status(200).json({ message: "Title deleted successfully" });
  } catch (error) {
    console.error("Error deleting title:", error);
    // 삭제 작업 중 발생한 오류를 클라이언트에게 반환
    res.status(500).json({ error: (error as Error).message });
  }
};
