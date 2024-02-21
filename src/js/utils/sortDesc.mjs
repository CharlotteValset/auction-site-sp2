export const sortDesc = (array) => {
  const sortedArray = array.sort(function (a, b) {
    return b.amount - a.amount; // Sort in descending order by bid amount
  });
  return sortedArray;
};
