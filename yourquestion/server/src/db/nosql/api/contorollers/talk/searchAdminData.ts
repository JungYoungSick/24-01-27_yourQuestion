// 관리자 데이터 검색
// 이 함수는 클라이언트로부터 받은 키워드를 사용하여 관리자 데이터를 검색하고, 검색 결과를 클라이언트에 반환합니다. 만약 검색 중에 오류가 발생하면 적절한 상태 코드와 함께 오류 메시지를 반환합니다.
import { Request, Response } from "express";
import { searchAdminCollection } from "./searchAdminCollection";

export const searchAdminData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const keyword = req.body.keyword;
    const results = await searchAdminCollection(keyword);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching in admin collection", error);
    res
      .status(500)
      .json({ message: "Error searching in admin collection", error });
  }
};
