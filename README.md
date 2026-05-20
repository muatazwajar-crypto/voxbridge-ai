# VoxBridge AI

VoxBridge AI is an open-source real-time multilingual voice communication platform.

It is designed to help people who speak different languages communicate naturally in calls, meetings, and future dedicated AI conference devices.

## Vision

VoxBridge AI is not a simple translator app.

It is an AI communication bridge that captures speech, understands meaning, translates intent, and later will preserve voice tone and emotional style.

## MVP Features

- Modern dark interface
- Microphone recording
- Speech-to-text
- AI translation
- Language selection
- Browser-based prototype
- Node.js backend
- Open-source friendly structure

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Speech-to-text: OpenAI audio transcription
- Translation: OpenAI API
- Future real-time communication: WebRTC
- Future UI: React
- Future speech output: Text-to-speech

## File Structure

```text
voxbridge-ai/
├─ index.html
├─ style.css
├─ app.js
├─ server.js
├─ package.json
├─ .gitignore
└─ README.md
```

## Roadmap

### Phase 1: MVP
- Record microphone audio
- Convert speech to text
- Translate text
- Display translated result

### Phase 2: Live Calls
- Add WebRTC
- Add real-time rooms
- Add multiple participants

### Phase 3: Meetings
- Meeting captions
- Speaker identification
- Meeting summaries
- Export transcripts

### Phase 4: AI Conference Devices
- Dedicated microphone device
- Speaker output
- Conference-room translation mode
- Offline fallback mode

### Phase 5: Voice-Preserving Translation
- Preserve speaker tone
- Preserve emotion
- Natural voice output
- Personal voice profiles with consent

## Environment Variables

Create a `.env` file locally:

```env
OPENAI_API_KEY=your_api_key_here
PORT=3000
```

Never upload `.env` to GitHub.

## Install

```bash
npm install
```

## Run

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## License

Apache-2.0
