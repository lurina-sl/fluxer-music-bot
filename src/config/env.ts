import * as dotenv from 'dotenv';

dotenv.config();

export type EnvironmentConfig = {
  fluxerBotToken: string;
  fluxerApiUrl: string;
  fluxerGatewayUrl: string;
  databaseUrl: string;
  nodelinkUrl: string;
  nodelinkPassword: string;
  defaultPrefix: string;
  voiceLeaveTimeoutMs: number;
  maxQueueSize: number;
  defaultVolume: number;
  autoLeaveEnabled: boolean;
  autoLeaveChannelEmpty: boolean;
  audioSourceMode: 'resolver' | 'direct';
};

export const config: EnvironmentConfig = {
  fluxerBotToken: process.env.FLUXER_BOT_TOKEN ?? '',
  fluxerApiUrl: process.env.FLUXER_API_URL ?? 'https://api.fluxer.app',
  fluxerGatewayUrl: process.env.FLUXER_GATEWAY_URL ?? 'wss://gateway.fluxer.app',
  databaseUrl: process.env.DATABASE_URL ?? './data/fluxer-music-bot.sqlite',
  nodelinkUrl: process.env.NODELINK_URL ?? '',
  nodelinkPassword: process.env.NODELINK_PASSWORD ?? '',
  defaultPrefix: (process.env.DEFAULT_PREFIX ?? '!').trim() || '!',
  voiceLeaveTimeoutMs: Number(process.env.VOICE_LEAVE_TIMEOUT_MS ?? 300000),
  maxQueueSize: Number(process.env.MAX_QUEUE_SIZE ?? 200),
  defaultVolume: Number(process.env.DEFAULT_VOLUME ?? 100),
  autoLeaveEnabled: (process.env.AUTO_LEAVE_ENABLED ?? 'true').toLowerCase() === 'true',
  autoLeaveChannelEmpty: (process.env.AUTO_LEAVE_CHANNEL_EMPTY ?? 'true').toLowerCase() === 'true',
  audioSourceMode: (process.env.AUDIO_SOURCE_MODE ?? 'resolver') as EnvironmentConfig['audioSourceMode'],
};

if (!config.fluxerBotToken) {
  console.warn('[WARN] FLUXER_BOT_TOKEN is missing. The bot will not authenticate until it is configured.');
}
