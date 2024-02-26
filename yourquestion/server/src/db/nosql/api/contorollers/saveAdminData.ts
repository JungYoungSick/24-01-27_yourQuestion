// 관리자 데이터 저장 (saveAdminData)

import { Request, Response } from "express";
import { adminSaveToMongoDB } from "../contorollers/talk/adminSaveToMongoDB";

export const saveAdminData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body;
    const saveResult = await adminSaveToMongoDB(data);
    res.status(200).json(saveResult);
  } catch (error) {
    console.error("Error saving data to admin collection:", error);
    res
      .status(500)
      .json({ message: "Error saving data to admin collection", error });
  }
};
