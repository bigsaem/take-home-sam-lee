import { validateSIN } from './validateSIN'; // Adjust the import based on your file structure

describe('validateSIN', () => {
  it('should return false for SINs that are not 9 digits', () => {
    expect(validateSIN('')).toBe(false);
    expect(validateSIN('123')).toBe(false);
    expect(validateSIN('1234567890')).toBe(false);
  });

  it('should return true for a valid SIN', () => {
    expect(validateSIN('046454286')).toBe(true);
  });

  it('should return false for a valid length SIN but invalid checksum', () => {
    expect(validateSIN('046454287')).toBe(false);
  });
});
