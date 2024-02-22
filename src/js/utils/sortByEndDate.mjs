export const sortByEndDate = (array) => {
  const sortedArray = array.slice().sort(function (a, b) {
    return new Date(a.endsAt) - new Date(b.endsAt); // Sort in ascending order by endsAt date
  });
  return sortedArray;
};
