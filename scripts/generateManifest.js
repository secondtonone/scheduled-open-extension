import * as fs from 'node:fs/promises';
import manifest from '../public/manifest.js';
import dotenv from 'dotenv';

dotenv.config();

const jsonString = JSON.stringify(manifest, null, 2);

const generateManifest = async () => {
  try {
    await fs.writeFile(`./${process.env.BUILD_PATH}/manifest.json`, jsonString);
    console.log('Manifest is generated!');
  } catch (error) {
    console.log('Error writing file', error);
  }
};

generateManifest();
