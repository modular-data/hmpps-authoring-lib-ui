export const buildAriaDescribedBy = (
  ...parts: Array<string | undefined>
): string | undefined => {
  const sanitizedParts = parts
    .map((part) => part?.trim())
    .filter((part) => Boolean(part));

  if (!sanitizedParts.length) {
    return undefined;
  }

  return sanitizedParts.join(' ');
};
