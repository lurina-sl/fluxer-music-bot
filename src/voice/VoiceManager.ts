export type VoiceJoinPayload = {
  guildId: string;
  channelId: string;
  userId?: string;
  selfMute?: boolean;
  selfDeaf?: boolean;
};

export type VoiceLeavePayload = {
  guildId: string;
  channelId?: string;
  connectionId?: string;
};

export class VoiceManager {
  private readonly connections = new Map<string, any>();

  join(payload: VoiceJoinPayload): any {
    const connection = {
      guildId: payload.guildId,
      channelId: payload.channelId,
      selfMute: payload.selfMute ?? false,
      selfDeaf: payload.selfDeaf ?? false,
      connected: true,
      connectionId: `voice-${payload.guildId}-${Date.now()}`,
    };

    this.connections.set(payload.guildId, connection);
    return connection;
  }

  leave(guildId: string): void {
    this.connections.delete(guildId);
  }

  get(guildId: string): any {
    return this.connections.get(guildId);
  }
}
