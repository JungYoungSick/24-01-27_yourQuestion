import { Request, Response } from "express";
import {
  userSaveToMongoDB,
  getFromMongoDB,
  adminSaveToMongoDB,
  AdminSavaData,
  client,
} from "./server";

export const saveUserData = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const saveResult = await userSaveToMongoDB(data);
    res.status(200).json(saveResult);
  } catch (error) {
    console.error("MongoDB에 데이터 저장 중 오류 발생:", error);
    res
      .status(500)
      .json({ message: "MongoDB에 데이터 저장 중 오류 발생", error });
  }
};

export const getUserData = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const result = await getFromMongoDB(query);
    res.status(200).json(result);
  } catch (error) {
    console.error("MongoDB에서 데이터 조회 중 오류 발생:", error);
    res.status(500).json({ message: "MongoDB에서 데이터 조회 중 오류 발생" });
  }
};

export const searchAdminData = async (req: Request, res: Response) => {
  try {
    const keyword = req.body.keyword;
    const db = client.db("prompt");
    const collection = db.collection("admin");
    const query = keyword ? { text: { $regex: keyword, $options: "i" } } : {};
    const results = await collection.find(query).toArray();
    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching in admin collection", error);
    res
      .status(500)
      .json({ message: "Error searching in admin collection", error });
  }
};

export const saveAdminData = async (req: Request, res: Response) => {
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

export const adminTalkPlus = async (req: Request, res: Response) => {
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
