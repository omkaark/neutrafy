let isActive = false;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        updateIcon(tab);
    }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    updateIcon(tab);
});

function updateIcon(tab) {
    if (!tab.url || !tab.url.includes('cnbc.com')) {
        isActive = false;
        chrome.action.setIcon({
            path: {
                "16": "neutrafy.png"
            }
        });
    } else {
        chrome.action.setIcon({
            path: {
                "16": `${isActive ? 'nobias' : 'bias'}.png`
            }
        });
    }
}

chrome.action.onClicked.addListener(async (tab) => {
    if (!tab.url || (!tab.url.includes('cnbc.com'))) {
        return;
    }

    isActive = !isActive;

    const icon = isActive ? 'nobias' : 'bias';
    chrome.action.setIcon({
        path: {
            "16": `${icon}.png`
        }
    });

    if (isActive) {
        try {
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });

            await chrome.tabs.sendMessage(tab.id, { action: "debiasHeadlines" });
        } catch (error) {
            console.error('Error:', error);
            chrome.action.setIcon({
                path: {
                    "16": "bias.png"
                }
            });
            isActive = false;
        }
    }
});