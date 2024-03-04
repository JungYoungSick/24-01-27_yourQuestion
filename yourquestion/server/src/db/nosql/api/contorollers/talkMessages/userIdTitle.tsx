import { connectMongoDB } from "../../../server";
import { Collection, Db } from "mongodb";
import { Message } from "../../../../../../../pages/Component/Src/interface/massage";

async function getUserMessages(
  userID: string,
  title: string
): Promise<Message[]> {
  const db: Db = await connectMongoDB();

  try {
    const userCollection: Collection<Message> = db.collection<Message>("user");

    // userID와 title을 사용하여 user 컬렉션에서 문서를 조회합니다.
    const userMessages: Message[] = await userCollection
      .find({ userID, title })
      .toArray();
    console.log("Retrieved user messages:", userMessages);
    return userMessages;
  } catch (error) {
    console.error("Failed to retrieve user messages:", error);
    throw error;
  }
}

async function getAdminMessages(
  userID: string,
  title: string
): Promise<Message[]> {
  const db: Db = await connectMongoDB();

  try {
    const adminCollection: Collection<Message> =
      db.collection<Message>("admin");

    // userID와 title을 사용하여 admin 컬렉션에서 문서를 조회합니다.
    const adminMessages: Message[] = await adminCollection
      .find({ userID, title })
      .toArray();
    console.log("Retrieved admin messages:", adminMessages);
    return adminMessages;
  } catch (error) {
    console.error("Failed to retrieve admin messages:", error);
    throw error;
  }
}

export { getUserMessages, getAdminMessages };
