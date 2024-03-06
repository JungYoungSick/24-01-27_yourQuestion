import jwt from "jsonwebtoken";

export function validateAndDecodeToken(encodedToken: string) {
  try {
    const decodedTokenString = decodeURIComponent(encodedToken);

    const tokenObj = JSON.parse(decodedTokenString);

    const token = tokenObj.token;

    const decodedToken = jwt.verify(token, "Login") as {
      userID: string;
    };

    return decodedToken.userID;
  } catch (error) {
    console.error("Error validating and decoding token:", error);
    return;
  }
}
