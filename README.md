# Fluxer Music Bot

Bot modular e pronto para Fluxer com camada de reprodução, fila por servidor, armazenamento SQLite e suporte a várias fontes de áudio.

## Requisitos

- Node.js 20+
- npm
- Token do bot Fluxer
- Fluxer API e Gateway válidos
- (Opcional) servidor de áudio compatível com LiveKit / NodeLink / Lavalink
- FFmpeg instalado caso você queira converter ou normalizar arquivos de áudio

## Observação importante sobre Fluxer

A documentação oficial do Fluxer ainda está evoluindo, especialmente nas áreas de autenticação, gateway, voice e LiveKit. Esta base foi montada com arquitetura modular para facilitar a adaptação à SDK e ao ambiente real do Fluxer, sem inventar endpoints ou eventos.

## Estrutura do projeto

```text
fluxer-music-bot/
├── src/
│   ├── app.ts
│   ├── index.ts
│   ├── bot/
│   │   ├── client.ts
│   │   └── commandRegistry.ts
│   ├── commands/
│   │   └── music.ts
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
│   │       ├── SoundCloudSource.ts
│   │       ├── YouTubeSource.ts
│   │       └── index.ts
│   ├── types/
│   │   └── fluxer.ts
│   ├── utils/
│   │   ├── errors.ts
│   │   ├── logger.ts
│   │   └── validators.ts
│   └── voice/
│       ├── ConnectionManager.ts
│       └── VoiceManager.ts
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

## Instalação

```bash
npm install
```

## Configuração do ambiente

Crie o arquivo `.env`:

```bash
cp .env.example .env
```

Preencha os valores reais:

```env
FLUXER_BOT_TOKEN=seu_token
FLUXER_API_URL=https://api.fluxer.app
FLUXER_GATEWAY_URL=wss://gateway.fluxer.app
DATABASE_URL=./data/fluxer-music-bot.sqlite
DEFAULT_PREFIX=! 
NODELINK_URL=
NODELINK_PASSWORD=
VOICE_LEAVE_TIMEOUT_MS=300000
MAX_QUEUE_SIZE=200
DEFAULT_VOLUME=100
AUTO_LEAVE_ENABLED=true
AUTO_LEAVE_CHANNEL_EMPTY=true
AUDIO_SOURCE_MODE=resolver
```

## Execução em desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Iniciar em produção

```bash
npm start
```

## Comandos principais

- `/play <música>`
- `/search <música>`
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
- `/remove <posição>`
- `/clear`
- `/autoplay`

Também é suportado o prefixo configurável, como `!play música`.

## Arquitertura de áudio

O projeto separa a lógica em camadas:

- `music/sources`: provedores e resolvers de fontes. Pode incluir YouTube, URL direta, SoundCloud e extensões futuras.
- `music/resolver`: transforma texto do usuário em estrutura de faixa.
- `music/Queue`: fila por servidor.
- `music/Player`: estado do player e controle de reprodução.
- `voice/`: conexão e reconexão no sistema de voz Fluxer/LiveKit.

## Banco de dados

O SQLite é opcional para reprodução básica, mas foi incluído para permitir configurações futuras por servidor, como:

- prefixo
- volume padrão
- autoplay
- 24/7
- idioma
- preferências musicais

## FFmpeg

Caso o transporte de áudio ou conversão de arquivos exija, instale o FFmpeg:

Ubuntu/Debian:

```bash
sudo apt update && sudo apt install ffmpeg
```

## Solução de problemas

### O bot não conecta ao Fluxer

- Verifique `FLUXER_BOT_TOKEN`.
- Confirme `FLUXER_API_URL` e `FLUXER_GATEWAY_URL`.
- Verifique permissões e infraestrutura do Fluxer.

### Falha na reprodução

- Confirme que o resolutor conseguiu montar uma URL válida.
- Teste a fonte de áudio diretamente.
- Verifique se o bot está conectado ao canal de voz.

### Erro no banco SQLite

- Certifique-se de que a pasta `data` existe e é gravável.
- Confirme a string `DATABASE_URL`.

## Licença

MIT
