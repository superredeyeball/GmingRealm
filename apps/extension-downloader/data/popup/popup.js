// Helper function to send messages to the background script
function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, response => {
      if (chrome.runtime.lastError) {
        console.error('Runtime error:', chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

// Function to handle the download
async function download(type) {
  const url = document.getElementById('url').value;
  const statusElement = document.querySelector('.status');
  const progressElement = document.querySelector('.progress');

  statusElement.textContent = `Downloading ${type}...`;
  progressElement.value = 0;

  try {
    const response = await sendMessage({ action: 'download', url, type });
    if (response.success) {
      statusElement.textContent = 'Download completed!';
      progressElement.value = 100;
    } else {
      statusElement.textContent = `Error: ${response.error}`;
    }
  } catch (error) {
    statusElement.textContent = `Error: ${error.message}`;
  }
}

// Function to load extension information
async function loadExtensionInfo() {
  const extensionElement = document.getElementById('extension');
  try {
    const response = await sendMessage({ action: 'getExtensionInfo' });
    if (response.id) {
      extensionElement.textContent = response.id;
    } else {
      extensionElement.textContent = 'No extension selected';
    }
  } catch (error) {
    extensionElement.textContent = 'Error loading extension info';
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  console.log('Popup script loaded');
  loadExtensionInfo();

  document.getElementById('crx').addEventListener('click', () => download('crx'));
  document.getElementById('zip').addEventListener('click', () => download('zip'));

  document.getElementById('url').addEventListener('input', async () => {
    const url = document.getElementById('url').value;
    try {
      const response = await sendMessage({ action: 'parseUrl', url });
      if (response.id) {
        document.getElementById('extension').textContent = response.id;
      }
    } catch (error) {
      console.error('Error parsing URL:', error);
    }
  });

  document.getElementById('reload').addEventListener('click', () => {
    chrome.tabs.reload();
  });

  document.getElementById('support').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://add0n.com/chrome-extension-downloader.html' });
  });

  document.getElementById('donation').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://www.paypal.me/add0n/5' });
  });
});

console.log('Popup script executed');
