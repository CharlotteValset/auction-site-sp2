/**
 * Sorts an array of objects by the 'amount' property in descending order.
 *
 * @param {Array} array - The array of objects to be sorted.
 * @returns {Array} - The sorted array in descending order based on the 'amount' property.
 *
 * @example
 * // Example usage:
 * const unsortedBids = [{ amount: 60 }, { amount: 30 }, { amount: 80 }];
 * const sortedBids = sortByAmountDesc(unsortedBids);
 * console.log(sortedBids);
 * // Output: [{ amount: 80 }, { amount: 60 }, { amount: 30 }]
 */
export const sortByAmountDesc = (array) => {
  // Use the 'sort' method to sort the array in descending order by the 'amount' property
  const sortedArray = array.sort(function (a, b) {
    return b.amount - a.amount;
  });
  // Return the sorted array
  return sortedArray;
};
