const { bogusTerms, cachedUrls } = require('../serverData');

  // Checks cache for previous urls for search term
  function checkCache(searched) {
    let urls = cachedUrls.get(searched);
    return urls;
  }
  
  // Adds search term to bogusTerms array if not already included
  function addToBogus(searched) {
    if (!bogusTerms.includes(searched)){
      bogusTerms.push(searched);
    } 
  }

  module.exports = { checkCache, addToBogus };