const path = require('path')

const APIKEY = 'cd020ec71241e90324bfb57600999051d0e73420';
const API = `https://vision.googleapis.com/v1/images:annotate?key=${APIKEY}`;
const payload = (imageURL) => ({
	image: {
		source: {
			imageUri: imageURL,
		},
	},
	features: [
		{
			maxResults: 2,
			type: 'LABEL_DETECTION',
		},
		{
			type: 'SAFE_SEARCH_DETECTION',
		},
	],
});

const googleVisionML = (imageURL) => {
  quickstart(imageURL)
	fetch(API, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'cache-control': 'no-cache',
		},
		body: JSON.stringify(payload(imageURL)),
	})
		.then((data) => {
			console.log(data.response, '======');
		})
		.catch((dataerr) => {
			console.log(dataerr.response, '======???');
		});
};

export default googleVisionML;


const vision = require('@google-cloud/vision');

async function quickstart(imageURL) {
  // Imports the Google Cloud client library
 
  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: path.resolve('/auth.json')
  });
 
  // Performs label detection on the image file
  const [result] = await client.labelDetection(imageURL);
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.description));
}