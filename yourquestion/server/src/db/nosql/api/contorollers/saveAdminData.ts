// 관리자 데이터 저장 (saveAdminData)
// 이 함수는 클라이언트로부터 받은 데이터를 MongoDB에 저장하고, 저장 결과를 클라이언트에 반환합니다. 만약 저장 중에 오류가 발생하면 적절한 상태 코드와 함께 오류 메시지를 반환합니다.

import { Request, Response } from "express";
import { adminSaveToMongoDB } from "../contorollers/talk/adminSaveToMongoDB";

export const saveAdminData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body;
    const encodedToken = req.headers.authorization?.split(" ")[1];
    console.log("Authorization Header:", req.headers.authorization);
    if (!encodedToken) {
      res.status(401).json({ message: "토큰이 제공되지 않았습니다." });
      return;
    }

    // URL 디코딩
    const decodedTokenString = decodeURIComponent(encodedToken);
    // JSON 파싱
    const tokenObj = JSON.parse(decodedTokenString);
    // 실제 토큰 추출
    const token = tokenObj.token;
    // 디코딩된 토큰 문자열을 출력합니다.
    console.log("Decoded Token String:", decodedTokenString);

    // JSON으로 파싱된 토큰 객체를 출력합니다.
    console.log("Parsed Token Object:", tokenObj);

    // 실제 사용되는 토큰 값을 출력합니다.
    console.log("Extracted Token:", token);

    // 클라이언트로부터 받은 데이터를 출력합니다.
    console.log("Received data from client:", data);

    const saveResult = await adminSaveToMongoDB(data, token);
    // 저장 결과를 출력합니다.
    console.log("Save Result:", saveResult);

    res.status(200).json(saveResult);
  } catch (error) {
    console.error("Error saving data to admin collection:", error);
    res
      .status(500)
      .json({ message: "Error saving data to admin collection", error });
  }
};
