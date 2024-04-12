const axios = require('axios');
const fs = require('fs');
const path = require('path'); // Import the 'path' module

export async function downloadImage(url: string, filename : string) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });

  // Ensure the folder exists, create it if it doesn't
  const filePath = path.join("L:/Work/payload/first-project/media", filename); // Create the full file path
  fs.writeFile(filePath, response.data, (err: string) => {
     console.log(err);
   });
}