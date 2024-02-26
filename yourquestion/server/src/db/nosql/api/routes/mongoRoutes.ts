// mongoServer.ts

import { MongoClient } from "mongodb";
import { Express } from "express";
import { userSaveToMongoDB } from "../contorollers/talk/userSaveToMongoDB";
import { getFromMongoDB } from "../contorollers/getFromMongoDB";
import { adminSaveToMongoDB } from "../contorollers/talk/adminSaveToMongoDB";
import { AdminSavaData } from "../contorollers/AdminSaveData";

const uri: string = "your_mongodb_connection_uri";
const client: MongoClient = new MongoClient(uri);
const dbName: string = "prompt";

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
