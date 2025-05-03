export const tokenizeQuery = (query: string): string[] => {
  return query.trim().replace(/\s+/g, " ").split(" ");
};

export const removeSpecialCharacters = (text: string): string => {
  return text.replace(/['"]/g, "");
};

export const doesTextMatchQuery = (text: string, query: string): boolean => {
  const flatText = removeSpecialCharacters(text);
  const flatTokens = tokenizeQuery(query).map(removeSpecialCharacters);
  return flatTokens.every((queryToken) => flatText.includes(queryToken));
};
