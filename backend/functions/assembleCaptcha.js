'use strict';
const { mixImages } = require('./mixImages');
const { addToBogus } = require('./serverDataFunctions');
const { bogusTerms } = require('../serverData');
const { createImagesArr } = require('./createImagesArr');


async function assembleCaptcha(req, res) {
    // If user tries to generate image grid with no search term
    if (req.body.search_term == ""){
      res.send({"captcha": null});
    }
  
    // Initializes arrays used for containing image urls related to user search term and
    // two randomly picked bogus search terms
    let validDataArray = [];
    let invalidDataArray = [];
    let invalidDataArray2 = [];
    let searchTerm = req.body.search_term;
  
    let bogusSearchTerm1 = bogusTerms[bogusTerms.length * Math.random() | 0];
    // Loops while user search term is the same as bogus search term
    // this is to ensure that at the base level the a user search term is not the same as bogus
    while (bogusSearchTerm1 == searchTerm) {
      bogusSearchTerm1 = bogusTerms[bogusTerms.length * Math.random() | 0];
    }
  
    let bogusSearchTerm2 = bogusTerms[bogusTerms.length * Math.random() | 0];
    // Loops while user search term is the same as bogus search term
    // this is to ensure that at the base level the a user search term is not the same as bogus
    while (bogusSearchTerm2 == searchTerm || bogusSearchTerm2 == bogusSearchTerm1) {
      bogusSearchTerm2 = bogusTerms[bogusTerms.length * Math.random() | 0];
    }
  
    // Calls to createImagesArr that return arrays containing urls
    validDataArray = await createImagesArr(searchTerm, 1);
    invalidDataArray = await createImagesArr(bogusSearchTerm1, 0);
    invalidDataArray2 = await createImagesArr(bogusSearchTerm2, 0);
  
    // Checks that a sufficient number of images (16) were retrieved for each search term
    if ( validDataArray.length < 16 || invalidDataArray.length < 16 || invalidDataArray2.length < 16 ) {
      res.send({"captcha": null});
    } else {

      // Calls mixImages which returns a single array containing urls randomly chosen from each array argument
      const mixedDataArray = mixImages(validDataArray, invalidDataArray, invalidDataArray2);
      
      // Calls addToBogus to perform basic server caching of user search term
      addToBogus(searchTerm);

      // console.log(mixedDataArray);

      // returns object containing CAPTCHA image urls to frontend
      res.send({"captcha": mixedDataArray});
    }
  }

  
module.exports = {assembleCaptcha};