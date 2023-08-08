import STORAGE from '~/constants/storage';
import type { IStore } from '~/types/IStorage';
import transformStore from './transformStore';

export default async function getUrls() {
  const { [STORAGE]: queue } = (await chrome.storage.local.get(STORAGE)) as IStore;

  return transformStore(queue);
}
