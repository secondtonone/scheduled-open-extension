import IScheduledPage from '~/types/IScheduledPage';
import type IStorage from '~/types/IStorage';

export default function transformQueue (queue: IScheduledPage[]) {
  return queue.reduce((acc, page) => {
    const {id, ...rest} = page;
    return { ...acc, [id]: rest };
  }, {} as IStorage);
}
