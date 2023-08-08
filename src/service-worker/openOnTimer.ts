import ALARM_NAME from '~/constants/alarmName';
import STORAGE from '~/constants/storage';

import getQueue from './getQueue';
import deleteFromQueue from '~/utils/deleteFromQueue';

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== ALARM_NAME) {
    const queue = await getQueue();

    chrome.tabs.create({
      url: queue[alarm.name].url,
    });

    const updatedQueue = deleteFromQueue(queue, alarm.name);

    await chrome.storage.local.set({
      [STORAGE]: updatedQueue,
    });
  }
});
