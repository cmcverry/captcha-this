// Receives three arrays and creates a new a array of 16 elements
// randomly selected from the three array arguments
// Returns the new array
function mixImages(validDataArray, invalidDataArray, invalidDataArray2) {
let mixedDataArray = [];
let i = 0;

// Fills validDataArray with image urls until there are 16 urls added
while (i < 16) {
  // Generates random number for deciding from which array an image will be taken from
  // There is a 2/5 chance, an image will be taken from the search term relevant array
  let toss = Math.floor((Math.random()* 10) + 1);
  if (toss <= 4) {
    // Randomly picks an image url from array
    let entry = validDataArray[validDataArray.length * Math.random() | 0];
    // Checks that the same image is not already been added to the mixedDataArray
    while (mixedDataArray.indexOf(entry) > -1) {
      entry = validDataArray[validDataArray.length * Math.random() | 0];
    }
    mixedDataArray.push(entry);
    i++;
  }
  else if (toss > 4 && toss < 8) {
    let entry = invalidDataArray[invalidDataArray.length * Math.random() | 0];
    while (mixedDataArray.indexOf(entry) > -1) {
      entry = invalidDataArray[invalidDataArray.length * Math.random() | 0];
    }
    mixedDataArray.push(entry);
    i++;
  }
  else {
    let entry = invalidDataArray2[invalidDataArray2.length * Math.random() | 0];
    while (mixedDataArray.indexOf(entry) > -1) {
      entry = invalidDataArray2[invalidDataArray2.length * Math.random() | 0];
    }
    mixedDataArray.push(entry);
    i++;
  }
}
return mixedDataArray;
}

module.exports = { mixImages };