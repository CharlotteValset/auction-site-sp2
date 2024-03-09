/**
 * Sorts an array of objects by the 'endsAt' property in ascending order.
 *
 * @param {Array} array - The array of objects to be sorted.
 * @returns {Array} - The sorted array in ascending order based on the 'endsAt' property.
 *
 * @example
 * // Example usage:
 * const unsortedListings = [{ endsAt: '2024-03-15' }, { endsAt: '2024-03-10' }, { endsAt: '2024-03-20' }];
 * const sortedListings = sortByEndDate(unsortedListings);
 * console.log(sortedListings);
 * // Output: [{ endsAt: '2024-03-10' }, { endsAt: '2024-03-15' }, { endsAt: '2024-03-20' }]
 */
export const sortByEndDate = (array) => {
  // Use the 'slice' method to create a shallow copy of the array before sorting
  const sortedArray = array.slice().sort(function (a, b) {
    // Sort in ascending order by the 'endsAt' property (convert to Date objects for comparison)
    return new Date(a.endsAt) - new Date(b.endsAt);
  });

  // Return the sorted array
  return sortedArray;
};
