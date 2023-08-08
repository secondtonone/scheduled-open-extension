import getQueue from './getQueue';
import deleteFromQueue from '~/utils/deleteFromQueue';
import STORAGE from '~/constants/storage';
import getCurrentDate from '~/utils/getCurrentDate';

async function checkStore() {
  const queue = await getQueue();
  const currentDate = new Date(getCurrentDate()).getTime();

  let updatedQueue = {};

  for(const id in queue) {
    const { datetime } = queue[id];
    if (datetime < currentDate) {
      chrome.alarms.clear(id);
      updatedQueue = deleteFromQueue(queue, id);
    }
  }

  await chrome.storage.local.set({
    [STORAGE]: updatedQueue,
  });
}

checkStore();
