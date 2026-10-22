export type VoiceJoinPayload = {
  guildId: string;
  channelId: string;
  userId?: string;
  selfMute?: boolean;
  selfDeaf?: boolean;
};

export class VoiceManager {
  private readonly connections = new Map<string, Record<string, unknown>>();

  join(payload: VoiceJoinPayload): Record<string, unknown> {
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

  get(guildId: string): Record<string, unknown> | undefined {
    return this.connections.get(guildId);
  }

  has(guildId: string): boolean {
    return this.connections.has(guildId);
  }
}
