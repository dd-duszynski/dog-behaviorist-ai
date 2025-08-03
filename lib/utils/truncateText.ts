export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) {
    return text;
  }
  let cutPosition = maxLength;

  if (text[maxLength] !== ' ') {
    while (cutPosition > 0 && text[cutPosition] !== ' ') {
      cutPosition--;
    }
    if (cutPosition === 0) {
      cutPosition = maxLength;
      const searchLimit = Math.min(text.length, maxLength + 20);
      while (cutPosition < searchLimit && text[cutPosition] !== ' ') {
        cutPosition++;
      }
      if (cutPosition >= searchLimit) {
        cutPosition = maxLength;
      }
    }
  }
  const truncated = text.substring(0, cutPosition).trimEnd();
  return truncated + '...';
};
