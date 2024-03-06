// 관리자 데이터 검색
// 이 함수는 클라이언트로부터 받은 키워드를 사용하여 관리자 데이터를 검색하고, 검색 결과를 클라이언트에 반환합니다. 만약 검색 중에 오류가 발생하면 적절한 상태 코드와 함께 오류 메시지를 반환합니다.
import { Request, Response } from "express";
import { searchAdminCollection } from "./searchAdminCollection";
import { validateAndDecodeToken } from "../../../../../../../pages/Component/Src/api/token/validateDecodeToken";
import { getUserDataFromMongoDB } from "../talkMessages/getuserDataFromMongoDB"; // 경로는 실제 위치에 맞게 수정해주세요
import { filterUserDataByTokenUserID } from "../talkMessages/filterUserDataByYokenUserID";

export const searchAdminData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Received token:", token);
    if (!token) {
      res.status(403).json({ message: "No token provided" });
      return;
    }

    const userID = validateAndDecodeToken(token);
    console.log("Extracted userID:", userID);
    if (!userID) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const keyword = req.body.keyword;
    console.log("Search keyword:", keyword);

    const userData = await getUserDataFromMongoDB(userID);

    const results = await searchAdminCollection(userID, keyword);

    const filteredData = filterUserDataByTokenUserID(userData, userID);

    if (filteredData.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "No matching data found" });
    }
  } catch (error) {
    console.error("Error searching in admin collection", error);
    res
      .status(500)
      .json({ message: "Error searching in admin collection", error });
  }
};
