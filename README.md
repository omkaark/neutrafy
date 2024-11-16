# Neutrafy 🧠

One-click freedom from emotionally charged news headlines using Chrome's built-in AI.

## The Problem

We're facing a crisis in how we consume news:

- 8 out of 10 people primarily get their news through headlines
- Publishers optimize for clicks using emotionally charged language
- Different word choices in headlines, even with the same information, significantly impact mental health
- This feeds into increasing societal division

## The Solution

Neutrafy transforms news headlines into their neutral form using Chrome's built-in AI, helping you:

- See news without emotional manipulation
- Make your own decisions about what's important
- Reduce mental fatigue from news consumption
- Break free from outrage cycles

## How It Works

1. Install the extension
2. Visit CNBC.com (more news sites supported soon)
3. Notice the extension icon turn red (indicating potential bias)
4. Click once to activate
5. Watch headlines transform to neutral versions
6. Icon turns green to show active neutralization

## Features

- One-click activation
- Visual feedback through icon states:
- Neutral (not on CNBC)
- Red (on CNBC, potential bias)
- Green (active neutralization)
- Gray color indication for processed headlines
- Local AI processing for privacy and speed
- Multi-language support (tested on Hindi, French, Spanish)

## Technical Details

### Permissions Required:

- `activeTab`: For accessing current CNBC tab
- `scripting`: For injecting content scripts
- `tabs`: For URL detection and icon updates
- Host permission for CNBC.com

### API Usage:

- Chrome's `languageModel` API for headline processing
- Local Gemini nano model for transformations

## Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/neutrafy.git
```
