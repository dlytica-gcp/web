import CryptoJS from "crypto-js";
 
const secretKey = process.env.NEXT_PUBLIC_CARD_NUMBER_SECRET_KEY;
 
export function maskCardNumber(cardNumber) {
  const cardNumberArray = cardNumber.split("");
  const length = cardNumberArray.length;
  const maskedArray = cardNumberArray.map((char, index) => {
    if (index < 2 || index >= length - 2) {
      return char;
    } else {
      return "X";
    }
  });
  return maskedArray.join("");
}
 
export function encryptCardNumber(cardNumber) {
  try {
    const encrypted = CryptoJS.AES.encrypt(cardNumber, secretKey).toString();
    return encrypted;
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Failed to encrypt card number");
  }
}
 
export function decryptCardNumber(encryptedCardNumber) {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedCardNumber, secretKey);
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Failed to decrypt card number");
  }
}