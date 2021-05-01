export const capitalize = (str: string) => {
  const capitalizeWord = (str: string) =>
    str[0].toUpperCase() + str.slice(1).toLowerCase();

  const split = str.trim().split(' ');
  if (split.length > 0) {
    return split.map((el) => capitalizeWord(el)).join(' ');
  } else {
    return capitalizeWord(str);
  }
};
