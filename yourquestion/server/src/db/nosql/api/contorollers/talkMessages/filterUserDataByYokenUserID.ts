export function filterUserDataByTokenUserID(
  userData: any[],
  tokenUserID: string
): any[] {
  const filteredData = userData.filter((data) => data.userID === tokenUserID);
  return filteredData;
}
