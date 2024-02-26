// api/controllers/mongo/adminTalkPlus.ts

import { Request, Response } from "express";
import { AdminSavaData } from "../contorollers/AdminSaveData";

export const adminTalkPlus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body;
    const result = await AdminSavaData(data);
    res.status(200).json({
      message: "Admin data saved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error saving admin data:", error);
    res.status(500).json({
      message: "Error saving admin data",
      error,
    });
  }
};
