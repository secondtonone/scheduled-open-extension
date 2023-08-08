import STORAGE from '~/constants/storage';

import type { IIdPage, IScheduledPageSettings } from '~/types/IScheduledPage';
import generateId from '~/utils/generateId';
import getQueue from './getQueue';

const handler = async (request: IScheduledPageSettings, sendResponse: (res: IIdPage) => void) => {
  const queue = await getQueue();

  const id: IIdPage['id'] = generateId();

  queue[id] = request;

  await chrome.storage.local.set({
    [STORAGE]: queue,
  });

  chrome.alarms.create(id, {
    when: request.datetime,
  });

  sendResponse({
    id
  });
};

chrome.runtime.onMessage.addListener(
  (
    request: IScheduledPageSettings,
    sender,
    sendResponse: (res: IIdPage) => void
  ) => {
    if (request.url) handler(request, sendResponse);
    return true;
  }
);
