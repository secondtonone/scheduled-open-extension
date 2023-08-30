import type IStorage from '~/types/IStorage';

const deleteFromQueue = (queue: IStorage, name: string) => {
  return Object.keys(queue).reduce((acc, id) => {
    return id === name ? acc : { ...acc, [id]: queue[id] };
  }, {} as IStorage);
};

export default deleteFromQueue;
