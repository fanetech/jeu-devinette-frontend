const getDate = (value) => {
  const date = new Date(value);
  return `${date.getDay()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

export const utils = {
    getDate
}
