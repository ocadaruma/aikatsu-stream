chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

  if (message.action === 'QUERY') {
    if (message.query === 'CURRENT_TIME') {
      sendResponse({ currentTime: document.getElementById("video").currentTime });
    }
  }
});

window.onunload = function () {
  chrome.runtime.sendMessage({ action: "CLOSE" });
};
