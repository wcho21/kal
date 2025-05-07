export const isLetter = (char: string): boolean => {
  if (char.length !== 1) {
    return false;
  }

  return /^[a-zA-Z가-힣_]$/.test(char);
};

export const isDigit = (char: string): boolean => {
  if (char.length !== 1) {
    return false;
  }

  return /^[0-9]$/.test(char);
};

export const isWhitespace = (char: string): boolean => {
  if (char.length > 2) {
    return false;
  }

  return /^(\r\n|[ \t\r\n])$/.test(char);
};
