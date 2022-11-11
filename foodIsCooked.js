/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function (kind, internalTemp, doneness) {
  if (kind === "chicken")
    return internalTemp >= 165;

  if (kind === "beef") {
    switch (doneness) {
      case 'rare':
        idealTemp = 125;
        break;
      case 'medium':
        idealTemp = 135;
        break;
      case 'medium-well':
        idealTemp = 145;
        break;
      default:
        idealTemp = 155;
    }
    return internalTemp >= idealTemp;
  }
}



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true


