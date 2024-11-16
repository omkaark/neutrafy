let originalHeadlines = new Map();

const SITE_CONFIGS = {
    'cnbc.com': {
        headlineSelector: '.Card-title'
    }
};

function getCurrentSiteConfig() {
    const hostname = window.location.hostname;
    if (hostname.includes('cnbc.com')) {
        return SITE_CONFIGS['cnbc.com'];
    }
    return null;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "debiasHeadlines") {
        debiasHeadlines()
            .then(() => sendResponse({ success: true }))
            .catch(error => {
                console.error('Error:', error);
                sendResponse({ success: false, error: error.message });
            });
        return true;
    }
});

async function debiasHeadlines() {
    try {
        const siteConfig = getCurrentSiteConfig();
        if (!siteConfig) {
            throw new Error('Unsupported website');
        }

        const session = await window.ai.languageModel.create({
            systemPrompt: `
            Transform headlines into neutral, fact-based statements.

            Replace emotional words with neutral ones:
            - "slams/blasts/rips" → "criticizes"
            - "sparks/triggers" → "causes"
            - "soars/skyrockets" → "increases"
            - "plunges/dives" → "decreases"
            - "fears/concerns" → "discusses"

            Rules:
            - Keep numbers and verifiable facts
            - Remove subjective adjectives (huge, devastating, shocking)
            - Replace dramatic verbs with specific actions
            - State market changes in percentages
            - Remove political/partisan labels

            Example: "Markets plunge as Fed sparks recession fears"
            Becomes: "Markets decrease 2.3% after Federal Reserve rate decision"

            Return only the debiased headline.
            `
        });

        const headlines = document.querySelectorAll(siteConfig.headlineSelector);

        for (const headline of headlines) {
            const originalText = headline.textContent.trim();

            if (!originalHeadlines.has(headline)) {
                originalHeadlines.set(headline, originalText);
            }

            try {
                const unbiasedHeadline = await session.prompt(originalText);
                headline.textContent = unbiasedHeadline;
            } catch (error) {
                console.error('Error processing headline:', originalText, error);
                headline.textContent = originalText;
            } finally {
                headline.style.color = 'green';
            }
        }
    } catch (error) {
        console.error('Error in debiasHeadlines:', error);
        throw error;
    }
}