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

export const getBaseUrl = (): string => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const getColor = (
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  theme: any,
  color: string,
  fallback = "transparent",
) => {
  if (!color) return fallback;

  const chakraColor = color.split(".");
  const isChakraColor = chakraColor.length === 2;

  if (!isChakraColor) return color;

  if (!theme.colors.hasOwnProperty(chakraColor[0])) return fallback;

  if (!theme.colors[chakraColor[0]].hasOwnProperty(chakraColor[1]))
    return fallback;

  return theme.colors[chakraColor[0]][chakraColor[1]];
};

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export const isObjectEqual = (obj1: any, obj2: any) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (const objKey of obj1Keys) {
    if (obj1[objKey] !== obj2[objKey]) {
      return false;
    }
  }

  return true;
};

export const getPriceFromPoints = (
  amount: number,
  currency: "usd" | "eth" | "sol" | "matic",
) => {
  const rate = {
    usd: 1,
    eth: 0.0008323864936967532,
    sol: 0.10005,
    matic: 1.3187392852433075,
  }[currency];
  return amount * rate;
};
