# CAPTCHA This

CAPTCHA This randomly generates a grid of images (essentially, an image CAPTCHA) corresponding to a user-entered search term.

CAPTCHA This is deployed on Google Cloud's App Engine and uses the Bing Image Search API for gathering image URLs. CAPTCHA This retrieves the 16 top images from the Bing API corresponding to the specified search term. Not all images used in the grid are related to the user's search term. These unrelated images are gathered via Bing API requests using hard-coded search terms and previous search terms entered by users. Previous used image URLs are cached, which decreases the amount of requests made to the API.

Technology stack: React.js, Node.js, Express.js, HTML, CSS

## Instructions
In your web browser navigate to https://captcha-this.ue.r.appspot.com/ 

In order to use the app, a user must enter a search term, wait for the grid to load, click the correct images, and click the solve button. 

If you choose the correct images, you will get popup that congratulates you and asks if you want to clear the image grid. Otherwise, you get get a popup asking you to try again.

Image grids are always generated randomly. However, successive usage of the same search term might yield previous images because
only the top 16 trending images for a search term are retrieved from the Bing API.
