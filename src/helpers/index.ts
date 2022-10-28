import CryptoJS from "crypto-js";

export const encrypt = (str: string) => {
  try {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    const key = CryptoJS.PBKDF2(process.env.APP_NAME!, salt, {
      keySize: 256 / 32,
      iterations: 100,
    });

    const encrypted = CryptoJS.AES.encrypt(str, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    const ret = salt.toString() + iv.toString() + encrypted.toString();

    return ret;
  } catch (err) {
    console.error(err);
    return "";
  }
};

export const decrypt = (str: string) => {
  try {
    const salt = CryptoJS.enc.Hex.parse(str.substring(0, 32));
    const iv = CryptoJS.enc.Hex.parse(str.substring(32, 32));
    const encrypted = str.substring(64);

    const key = CryptoJS.PBKDF2(process.env.APP_NAME!, salt, {
      keySize: 256 / 32,
      iterations: 100,
    });

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error(err);
    return "";
  }
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
