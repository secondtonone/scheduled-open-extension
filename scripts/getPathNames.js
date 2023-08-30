import { fileURLToPath } from 'url';
import path from 'path';

const getPathNames = (metaUrl) => {
  const __filename = fileURLToPath(metaUrl);
  const __dirname = path.dirname(__filename);
  return { __dirname, __filename};
};

export default getPathNames;
