export type TrackSource = 'youtube' | 'soundcloud' | 'direct' | 'unknown';

export type TrackMeta = {
  id: string;
  title: string;
  artist?: string;
  url: string;
  durationSeconds?: number;
  thumbnail?: string;
  source: TrackSource;
  requestedBy?: string;
};

export type PlayerState = 'IDLE' | 'CONNECTING' | 'PLAYING' | 'PAUSED' | 'STOPPING' | 'DISCONNECTED' | 'ERROR';

export type LoopMode = 'NONE' | 'TRACK' | 'QUEUE';

export type VoiceConnectionState = {
  guildId: string;
  channelId?: string;
  connected: boolean;
  reconnecting: boolean;
  connectionId?: string;
};
