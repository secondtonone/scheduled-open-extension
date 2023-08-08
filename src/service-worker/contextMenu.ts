const id = 'chronoLinkOpener';

chrome.contextMenus.removeAll(() => {
  const contextMenuItem = {
    id,
    title: 'Add this site url to schedule',
  };
  
  chrome.contextMenus.create(contextMenuItem);
});

chrome.contextMenus.onClicked.addListener((clickData) => {
  chrome.tabs.create({url: `popup.html?url=${clickData.pageUrl}`});
});
