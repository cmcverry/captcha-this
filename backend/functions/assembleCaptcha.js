'use strict';

const { getImages } = require('./getBingImages');
const { mixImages } = require('./mixImages');
const { addToBogus, checkCache } = require('./serverDataFunctions');
const { bogusTerms, cachedUrls } = require('../serverData');
const { createImagesArr } = require('./createImagesArr');

async function assembleCaptcha(req, res) {
    // If user tries to generate image grid with no search term
    if (req.body.search_term == ""){
      res.send({"captcha": null});
    }
  
    // Initializes arrays used for containing image urls
    let validDataArray = [];
    let invalidDataArray = [];
    let invalidDataArray2 = [];
    let searchTerm = req.body.search_term;
  
    let bogusSearchTerm1 = bogusTerms[bogusTerms.length * Math.random() | 0];
    // Loops while user search term is the same as bogus search term
    while (bogusSearchTerm1 == searchTerm) {
      bogusSearchTerm1 = bogusTerms[bogusTerms.length * Math.random() | 0];
    }
  
    let bogusSearchTerm2 = bogusTerms[bogusTerms.length * Math.random() | 0];
      // Loops while user search term is the same as bogus search term
    while (bogusSearchTerm2 == searchTerm || bogusSearchTerm2 == bogusSearchTerm1) {
      bogusSearchTerm2 = bogusTerms[bogusTerms.length * Math.random() | 0];
    }
  
    validDataArray = await createImagesArr(searchTerm, 1);
    invalidDataArray = await createImagesArr(bogusSearchTerm1, 0);
    invalidDataArray2 = await createImagesArr(bogusSearchTerm2, 0);
  
    // Checks that a sufficient number of images were retrieved
    if ( validDataArray.length < 16 || invalidDataArray.length < 16 || invalidDataArray2.length < 16 ) {
      res.render('index.ejs', {"search": [searchTerm], "data": ""});
    } else {
    let mixedDataArray = mixImages(validDataArray, invalidDataArray, invalidDataArray2);
    
    addToBogus(searchTerm);
    // Renders index.ejs with object containing user search term and mixedDataArray
    console.log(mixedDataArray);
    res.send({"captcha": mixedDataArray});
    }
  }

  
module.exports = {assembleCaptcha};