import { MongoClient, Db } from "mongodb";

// MongoDB 연결 URL
const uri: string = "mongodb+srv://jung:1216@cluster0.ufpsr69.mongodb.net/";

// MongoDB 클라이언트 인스턴스 생성
const client: MongoClient = new MongoClient(uri);

// 연결할 데이터베이스 및 컬렉션 이름
const dbName: string = "prompt";
const collectionNames = {
  users: "user",
  admins: "admin",
  adminSaveData: "adminSaveData",
};

// MongoDB에 연결하는 함수
export async function connectMongoDB(): Promise<Db> {
  try {
    await client.connect();
    console.log("MongoDB에 연결되었습니다.");

    // 지정된 데이터베이스 선택
    const db: Db = client.db(dbName);
    console.log(`데이터베이스 '${dbName}'가 준비되었습니다.`);

    // 데이터베이스 객체 반환
    return db;
  } catch (error) {
    console.error("MongoDB 연결에 실패했습니다:", error);
    throw error;
  }
}

// 필요한 컬렉션에 접근하는 함수 예시 (선택적)
export async function getUserCollection() {
  const db = await connectMongoDB();
  return db.collection(collectionNames.users);
}

// MongoDB 클라이언트를 외부에서 사용할 수 있도록 export (선택적)
export { client };
