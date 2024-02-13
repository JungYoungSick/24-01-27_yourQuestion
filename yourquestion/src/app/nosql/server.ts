import { MongoClient } from "mongodb";

const uri: string = "mongodb+srv://jung:1216@cluster0.ufpsr69.mongodb.net/";
const client: MongoClient = new MongoClient(uri);
const dbName: string = "prompt";
const collectionUserName: string = "user";
const collectionAdminName: string = "admin";
let documentCount: number = 0;

// server 시작 시 MongoDB 연결 문구
async function connectToMongoDB(): Promise<void> {
  try {
    await client.connect();
    console.log("MongoDB에 연결되었습니다.");
  } catch (error) {
    console.error("MongoDB 연결에 실패했습니다:", error);
  }
}

// user data 사용자 데이터 저장.
async function userSaveToMongoDB(
  data: Record<string, any>
): Promise<{ message: string; _id: unknown; sequenceNumber: Number }> {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionUserName);

    documentCount++;
    const sequenceNumber = documentCount;
    const documentToInsert = {
      ...data,
      sequenceNumber,
      receivedAt: new Date(),
    };

    const result = await collection.insertOne(documentToInsert);
    console.log(
      `MongoDB에 사용자 데이터가 저장되었습니다: ${result.insertedId}`
    );

    return {
      message: "사용자 데이터 저장 성공",
      _id: result.insertedId,
      sequenceNumber,
    };
  } catch (error) {
    console.error("MongoDB에 사용자 데이터 저장 중 오류 발생:", error);
    throw error;
  }
}

// admin data 사용자 데이터 저장.
async function adminSaveToMongoDB(
  data: Record<string, any>
): Promise<{ message: string; _id: unknown; sequenceNumber: Number }> {
  try {
    const db = client.db(dbName);
    const adminCollection = db.collection(collectionAdminName);

    documentCount++;
    const sequenceNumber = documentCount;
    const documentToInsert = {
      ...data,
      sequenceNumber,
      receivedAt: new Date(),
    };

    const result = await adminCollection.insertOne(documentToInsert);
    console.log(`MongoDB에 유저 데이터가 저장되었습니다: ${result.insertedId}`);

    return {
      message: "사용자 데이터 저장 성공",
      _id: result.insertedId,
      sequenceNumber,
    };
  } catch (error) {
    console.error("MongoDB에 사용자 데이터 저장 중 오류 발생:", error);
    throw error;
  }
}
// 메인페이지 내에서 admin data 불러오기.
async function getFromMongoDB(
  query: Record<string, any>
): Promise<Array<Record<string, any>>> {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionUserName);

    const result = await collection.find(query).toArray();
    console.log("Admin 데이터 불러오기 완료");
    return result;
  } catch (error) {
    console.error("getFromMongoDB 함수에서 에러가 발생하였습니다.", error);
    throw error;
  }
}

// MongoDB 연결 시작.
connectToMongoDB();

export { userSaveToMongoDB, getFromMongoDB, adminSaveToMongoDB, client };
