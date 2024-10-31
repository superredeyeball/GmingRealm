importScripts("lib/config.js");
importScripts("lib/chrome.js");
importScripts("lib/runtime.js");
importScripts("lib/common.js");

// Function to download file
function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    chrome.downloads.download({
      url: url,
      filename: filename,
      saveAs: true
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(downloadId);
      }
    });
  });
}

// Function to get CRX download URL
function getCrxUrl(extensionId) {
  return `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=49.0&x=id%3D${extensionId}%26installsource%3Dondemand%26uc`;
}

// Function to get ZIP download URL (this is a placeholder, as direct ZIP downloads are not typically available)
function getZipUrl(extensionId) {
  // In reality, you'd need to implement a server-side solution to convert CRX to ZIP
  // For now, we'll just use the CRX URL as a placeholder
  return getCrxUrl(extensionId);
}

// Function to parse extension ID from URL
function parseExtensionId(url) {
  const match = url.match(/(?:chrome\.google\.com\/webstore\/detail\/[^\/]+\/)([a-z]{32})/i);
  return match ? match[1] : null;
}

// Message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request);
  switch (request.action) {
    case 'download':
      const extensionId = parseExtensionId(request.url);
      if (!extensionId) {
        sendResponse({ success: false, error: 'Invalid URL' });
        return;
      }

      const downloadUrl = request.type === 'crx' ? getCrxUrl(extensionId) : getZipUrl(extensionId);
      const filename = `${extensionId}.${request.type}`;

      downloadFile(downloadUrl, filename)
        .then(() => sendResponse({ success: true }))
        .catch((error) => sendResponse({ success: false, error: error.message }));
      return true; // Indicates that the response is asynchronous

    case 'parseUrl':
      const id = parseExtensionId(request.url);
      sendResponse({ id: id });
      break;

    case 'getExtensionInfo':
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          const url = tabs[0].url;
          const id = parseExtensionId(url);
          sendResponse({ id: id });
        } else {
          sendResponse({ id: null });
        }
      });
      return true; // Indicates that the response is asynchronous
  }
});

console.log('Background script loaded');
