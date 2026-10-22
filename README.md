# Fluxer Music Bot

A modular, production-ready music bot for Fluxer built with TypeScript and the official Fluxer SDK ecosystem.

## Requirements

- Node.js 20+
- npm or pnpm
- A Fluxer bot token
- Optional: LiveKit-compatible voice server / NodeLink or Lavalink setup
- Optional: ffmpeg for local audio conversion

## Important note about Fluxer docs and voice

The official Fluxer documentation is still evolving. The key public sources used for this project are:

- https://docs.fluxer.app/
- https://fluxer.js.org/
- https://github.com/fluxerjs/core
- https://github.com/fluxerjs/voice

The project follows the current guidance available there while keeping the code modular and resilient to API changes by isolating Fluxer-specific runtime assumptions behind wrappers.

## Project structure

```text
fluxer-music-bot/
├── src/
│   ├── bot/
│   │   ├── client.ts
│   │   ├── commandRegistry.ts
│   │   └── eventBus.ts
│   ├── commands/
│   │   ├── music/
│   │   │   ├── autoplay.ts
│   │   │   ├── clear.ts
│   │   │   ├── leave.ts
│   │   │   ├── loop.ts
│   │   │   ├── nowplaying.ts
│   │   │   ├── pause.ts
│   │   │   ├── play.ts
│   │   │   ├── queue.ts
│   │   │   ├── remove.ts
│   │   │   ├── resume.ts
│   │   │   ├── search.ts
│   │   │   ├── shuffle.ts
│   │   │   ├── skip.ts
│   │   │   ├── stop.ts
│   │   │   └── volume.ts
│   │   └── registerCommands.ts
│   ├── config/
│   │   └── env.ts
│   ├── database/
│   │   ├── database.ts
│   │   ├── models/
│   │   │   └── serverSettings.ts
│   │   └── repositories/
│   │       └── serverSettingsRepository.ts
│   ├── music/
│   │   ├── Player.ts
│   │   ├── PlayerManager.ts
│   │   ├── Queue.ts
│   │   ├── Track.ts
│   │   ├── types.ts
│   │   ├── resolver/
│   │   │   └── TrackResolver.ts
│   │   └── sources/
│   │       ├── AudioSource.ts
│   │       ├── DirectUrlSource.ts
│   │       ├── YouTubeSource.ts
│   │       └── index.ts
│   ├── types/
│   │   └── fluxer.ts
│   ├── utils/
│   │   ├── errors.ts
│   │   ├── logger.ts
│   │   └── validators.ts
│   ├── voice/
│   │   ├── ConnectionManager.ts
│   │   └── VoiceManager.ts
│   ├── index.ts
│   └── app.ts
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

## Installation

```bash
npm install
```

## Environment configuration

Copy the example file:

```bash
cp .env.example .env
```

Then fill in the variables:

```env
FLUXER_BOT_TOKEN=your_fluxer_token
FLUXER_API_URL=https://api.fluxer.app
FLUXER_GATEWAY_URL=wss://gateway.fluxer.app
DATABASE_URL=./data/fluxer-music-bot.sqlite
NODELINK_URL=
NODELINK_PASSWORD=
DEFAULT_PREFIX=! 
VOICE_LEAVE_TIMEOUT_MS=300000
MAX_QUEUE_SIZE=200
DEFAULT_VOLUME=100
AUTO_LEAVE_ENABLED=true
AUTO_LEAVE_CHANNEL_EMPTY=true
AUDIO_SOURCE_MODE=resolver
```

## Running the bot

For development:

```bash
npm run dev
```

For production build:

```bash
npm run build
npm start
```

## Commands

The bot exposes a Fluxer-compatible command layer with prefix configuration. Common commands include:

- `/play <query>` or `!play <query>`
- `/search <query>` or `!search <query>`
- `/pause`
- `/resume`
- `/skip`
- `/stop`
- `/leave`
- `/queue`
- `/nowplaying`
- `/volume <0-200>`
- `/shuffle`
- `/loop`
- `/remove <index>`
- `/clear`
- `/autoplay`

## Audio architecture

The design is intentionally modular:

- `music/sources/` handles providers such as YouTube, direct URLs, and future plugins.
- `music/resolver/` resolves user input into track metadata and source URLs.
- `music/Queue.ts` stores server-scoped playback queues.
- `music/Player.ts` manages playback state transitions, volume, looping, and autoplay.
- `voice/` manages the Fluxer/LiveKit connection lifecycle.

## SQLite

The database layer is optional for basic playback, but included to support future server settings and per-guild defaults such as:

- prefix
- default volume
- autoplay
- 24/7 mode
- language
- music preferences

## FFmpeg

If you plan to transcode or normalize audio from direct URLs or incompatible sources, install FFmpeg and make sure it is available in PATH.

On Ubuntu/Debian:

```bash
sudo apt update
sudo apt install ffmpeg
```

## Troubleshooting

### Bot does not connect

- Verify `FLUXER_BOT_TOKEN` is valid.
- Confirm the Fluxer API and Gateway URLs are correct.
- Check that the bot has permission to connect to the correct channels.

### No audio playback

- Confirm the track resolver returns a valid playable URL.
- Check the source adapter for the track provider.
- Make sure the bot has joined a voice channel and the LiveKit session is active.

### Queue not persisting

- Ensure the SQLite path exists and is writable.
- Check the database connection in `src/database/database.ts`.

## Notes on Fluxer voice and LiveKit

Fluxer voice support is tied to the current Fluxer + LiveKit ecosystem. The code in this repository isolates Fluxer-specific API assumptions behind wrappers so the bot can be updated as Fluxer changes without rewriting the entire command system.

## License

MIT
