chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

  if (message.action === 'AIKATSU_QUERY') {
    if (message.query === 'CURRENT_TIME') {

      var video = document.getElementById("video");
      sendResponse({ currentTime: video ? video.currentTime : -1 });
    }
  }
  return true;
});
