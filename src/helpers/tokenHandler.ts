import { encrypt, decrypt } from ".";

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export const getAccessToken = () => {
  const encryptedToken = localStorage.getItem(`${process.env.APP_NAME}-stage`)!;
  const tokens: Tokens = JSON.parse(decrypt(encryptedToken));
  return tokens.accessToken;
};

export const getTokenData = () => {
  const encryptedToken = localStorage.getItem(`${process.env.APP_NAME}-stage`)!;
  const tokens: Tokens = JSON.parse(decrypt(encryptedToken));
  return JSON.parse(
    Buffer.from(tokens.accessToken.split(".")[1], "base64").toString(),
  );
};

export const encryptTokenData = (tokens: Tokens) => {
  const encrypted = encrypt(JSON.stringify(tokens));
  localStorage.setItem(`${process.env.APP_NAME}-stage`, encrypted);
};
