export const arrivalTimeToString = (arrivalTime: number) => {
  const minutesLeft = Math.floor((arrivalTime - Date.now() / 1000) / 60);
  if (minutesLeft < 0) return "עבר";
  else if (minutesLeft === 0) return "כעת";
  else if (minutesLeft < 60) return minutesLeft.toString();
  else return new Date(arrivalTime * 1000).toTimeString().slice(0, 5);
};
