export const validateSIN = (sin: string): boolean => {
  // 1. Check if SIN is 9 digits
  if (sin.length !== 9) {
    return false;
  }

  // 2. Luhn Algorithm
  let sum = parseInt(sin[0], 10) * 2;
  for (let i = 1; i < sin.length; i++) {
    const digit = parseInt(sin[i], 10);
    if (i % 2 !== 0) {
      sum += digit > 4 ? digit * 2 - 9 : digit * 2;
    } else {
      sum += digit;
    }
  }

  return sum % 10 === 0;
};
