document.addEventListener("DOMContentLoaded", function() {

  document.getElementById("play").addEventListener("click", function () {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var currentTab = tabs[0];

      chrome.runtime.sendMessage({ action: "PLAY", tabId: currentTab.id }, function () {
        window.close();
      });
    });
  });

  document.getElementById("forward").addEventListener("click", function () {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var currentTab = tabs[0];

      chrome.runtime.sendMessage({ action: "FORWARD", tabId: currentTab.id }, function () {
        window.close();
      });
    });
  });
});
