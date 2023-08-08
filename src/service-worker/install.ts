import STORAGE from '~/constants/storage';

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === 'install') {
    chrome.storage.local.set({
      [STORAGE]: {}
    });
  }
});
