import { writeFile } from 'fs';
import manifest from './public/manifest.js';
import dotenv from 'dotenv';

dotenv.config();

const jsonString = JSON.stringify(manifest, null, 2);

writeFile(`./${process.env.BUILD_PATH}/manifest.json`, jsonString, err => {
  if (err) {
    console.log('Error writing file', err);
  } else {
    console.log('Manifest is generated!');
  }
});
