// 다음 시퀀스 번호 가져오기
// 이 함수는 주어진 컬렉션에서 가장 최근에 저장된 문서의 시퀀스 번호를 가져와서 1을 더한 값을 반환합니다. 만약 해당 컬렉션에 문서가 없는 경우에는 1을 반환합니다.

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
