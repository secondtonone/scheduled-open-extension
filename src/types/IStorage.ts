import STORAGE from '~/constants/storage';
import type { IIdPage, IScheduledPageSettings } from './IScheduledPage';

interface IStorage {
  [key: IIdPage['id']]: IScheduledPageSettings
}

export type IStore = {
  [key in typeof STORAGE]: IStorage;
};

export default IStorage;
