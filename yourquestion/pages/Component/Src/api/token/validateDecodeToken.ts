import jwt from "jsonwebtoken";

export function validateAndDecodeToken(encodedToken: string) {
  try {
    const decodedTokenString = decodeURIComponent(encodedToken);
    console.log("Decoded token string:", decodedTokenString);
    // JSON 파싱
    const tokenObj = JSON.parse(decodedTokenString);
    console.log("Token object:", tokenObj);
    // 실제 토큰 추출
    const token = tokenObj.token;
    console.log("Extracted token:", token);
    // 토큰 유효성 검사
    const decodedToken = jwt.verify(token, "Login") as {
      userID: string;
    };
    console.log("Decoded token:", decodedToken);
    // 추출된 사용자 ID 반환
    return decodedToken.userID;
  } catch (error) {
    console.error("Error validating and decoding token:", error);
    return;
  }
}
