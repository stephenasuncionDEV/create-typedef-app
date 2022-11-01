import { encrypt, decrypt } from ".";

const APP_NAME = process.env.APP_NAME;

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export const getAccessToken = () => {
  const encryptedToken = localStorage.getItem(`${APP_NAME}-stage`);
  const tokens: Tokens = JSON.parse(decrypt(encryptedToken as string));
  return tokens.accessToken;
};

export const getTokenData = () => {
  const encryptedToken = localStorage.getItem(`${APP_NAME}-stage`);
  const tokens: Tokens = JSON.parse(decrypt(encryptedToken as string));
  return JSON.parse(
    Buffer.from(tokens.accessToken.split(".")[1], "base64").toString(),
  );
};

export const encryptTokenData = (tokens: Tokens) => {
  const encrypted = encrypt(JSON.stringify(tokens));
  localStorage.setItem(`${APP_NAME}-stage`, encrypted);
};
