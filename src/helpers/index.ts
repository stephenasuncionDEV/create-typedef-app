import CryptoJS from "crypto-js";

export const encrypt = (str: string) => {
  return CryptoJS.AES.encrypt(
    str,
    process.env.NEXTAUTH_SECRET as string,
  ).toString();
};

export const decrypt = (str: string) => {
  return CryptoJS.AES.decrypt(
    str,
    process.env.NEXTAUTH_SECRET as string,
  ).toString(CryptoJS.enc.Utf8);
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
