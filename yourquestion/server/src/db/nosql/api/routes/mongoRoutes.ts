// MongoDB routes
// 이 코드는 Express 애플리케이션에서 MongoDB와 관련된 라우트를 설정하고, MongoDB에 연결하는 함수를 정의합니다. 설정된 라우트는 각각의 요청에 따라 적절한 MongoDB 함수를 호출하여 데이터를 처리합니다.

import { MongoClient } from "mongodb";
import { Express } from "express";
import { userSaveToMongoDB } from "../contorollers/talk/userSaveToMongoDB";
import { getFromMongoDB } from "../contorollers/talkList/getFromMongoDB";
import { adminSaveToMongoDB } from "../contorollers/talk/adminSaveToMongoDB";
import { AdminSavaData } from "../contorollers/newTogle/adminTalkPlus/AdminSaveData";

const uri: string = "your_mongodb_connection_uri";
const client: MongoClient = new MongoClient(uri);

export async function connectToMongoDB(): Promise<void> {
  try {
    await client.connect();
    console.log("MongoDB에 연결되었습니다.");
  } catch (error) {
    console.error("MongoDB 연결에 실패했습니다:", error);
  }
}

export function setupMongoRoutes(app: Express): void {
  app.post("/mongo/user", userSaveToMongoDB);
  app.get("/mongo/admin/data", getFromMongoDB);
  app.post("/mongo/admin/save", adminSaveToMongoDB);
  app.post("/mongo/adminSaveData", AdminSavaData);
}
