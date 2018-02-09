////////////////
// global vars
////////////////
var currentTuneIndex = 0;
var currentTabId = -1;
var timer;

function buildUrl(tune) {
  return "https://anime.dmkt-sp.jp/animestore/sc_d_pc?partId=" + tune.partId +
    "&startPosition=" + tune.start + "s";
}

function pollTuneEnd(tabId, tune, tuneIndex) {

  timer = setTimeout(function () {
    chrome.tabs.sendMessage(tabId, { action: "QUERY", query: "CURRENT_TIME" }, function (responseMessage) {
      if (responseMessage) {
        if (responseMessage.currentTime <= tune.end) {
          pollTuneEnd(tabId, tune, tuneIndex);
        } else {

          if (tuneIndex < PLAYLIST.length - 1) {
            var nextIndex = tuneIndex + 1;

            clearTimeout(timer);
            chrome.tabs.update(tabId, {url: buildUrl(PLAYLIST[nextIndex])}, function () {
              currentTuneIndex = nextIndex;
              pollTuneEnd(tabId, PLAYLIST[nextIndex], nextIndex);
            });
          }
        }
      }
    });
  }, 500)
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  var tabId;

  if (message.action === "PLAY") {
    tabId = currentTabId > -1 ? currentTabId : message.tabId;
    currentTabId = tabId;

    clearTimeout(timer);
    chrome.tabs.update(tabId, { url: buildUrl(PLAYLIST[0]) }, function () {
      currentTuneIndex = 0;
      pollTuneEnd(tabId, PLAYLIST[0], 0);
    });
  } else if (message.action === "FORWARD") {
    tabId = currentTabId > -1 ? currentTabId : message.tabId;
    currentTabId = tabId;

    if (currentTuneIndex < PLAYLIST.length - 1) {
      currentTuneIndex++;

      clearTimeout(timer);
      chrome.tabs.update(tabId, { url: buildUrl(PLAYLIST[currentTuneIndex]) }, function () {
        pollTuneEnd(tabId, PLAYLIST[currentTuneIndex], currentTuneIndex);
      });
    }
  } else if (message.action === "CLOSE") {
    currentTabId = -1;
  }
});
