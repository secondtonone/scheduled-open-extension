import type IStorage from '~/types/IStorage';

export default function transformStore (queue: IStorage) {
  return Object.entries(queue).map(([id, { datetime, url }]) => ({
    id,
    url,
    datetime,
  }));
}
