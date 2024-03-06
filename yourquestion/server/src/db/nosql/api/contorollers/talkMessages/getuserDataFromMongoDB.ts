import { Db, Collection } from "mongodb";
import { client } from "../../../server";

export async function getUserDataFromMongoDB(userID: string): Promise<any[]> {
  try {
    const db: Db = client.db("prompt");
    const collection: Collection = db.collection("adminSaveData");

    const userData = await collection.find({ userID }).toArray();
    return userData;
  } catch (error) {
    console.error("Error getting user data from MongoDB:", error);
    throw error;
  }
}
