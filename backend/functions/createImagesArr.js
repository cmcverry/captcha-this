  const {checkCache} = require('./serverDataFunctions');
  const { getImages } = require('./getBingImages');
  const { cachedUrls } = require('../serverData');
  
  // Receives search, a string representing a search term, and valid,
  //  a integer value indicating whether this is the user's search term
  // Calls getImages, pushes each image, represented as an object, into
  //  an array 
  // Returns array of image objects
  async function createImagesArr(search, valid) {
    let imageArr = [];
    let images = checkCache(search);
    if (images === undefined) {
      images = await getImages(search);
      cachedUrls.set(search, images);
    }
    for (const img in images) {
      imageArr.push({searched: valid, url: images[img]});
    }
    return imageArr;
  }

  module.exports = {createImagesArr};