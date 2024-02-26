// 다음 시퀀스 번호 가져오기

import { Collection } from "mongodb";
import { client } from "../../../server";

export async function getNextSequenceNumber(
  collectionName: string,
  userType: string
): Promise<number> {
  const db = client.db("prompt");
  const collection: Collection = db.collection(collectionName);
  const lastDocument = await collection
    .find({})
    .sort({ sequenceNumber: -1 })
    .limit(1)
    .toArray();
  let nextSequenceNumber = 1;

  if (lastDocument.length !== 0) {
    const lastSequenceNumber = lastDocument[0].sequenceNumber;
    nextSequenceNumber = lastSequenceNumber + 1;
  }

  return nextSequenceNumber;
}
