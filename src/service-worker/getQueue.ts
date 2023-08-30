import STORAGE from '~/constants/storage';

import type { IStore } from '~/types/IStorage';

const getQueue =  async () => {
  const { [STORAGE]: queue } = (await chrome.storage.local.get(
    STORAGE
  )) as IStore;

  return queue ? queue : {};
};

export default getQueue;
