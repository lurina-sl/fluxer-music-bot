import { VoiceManager } from './VoiceManager';

export class ConnectionManager {
  private readonly voiceManager: VoiceManager;

  constructor() {
    this.voiceManager = new VoiceManager();
  }

  join(guildId: string, channelId: string): Record<string, unknown> {
    return this.voiceManager.join({ guildId, channelId });
  }

  leave(guildId: string): void {
    this.voiceManager.leave(guildId);
  }

  reconnect(guildId: string, channelId: string): Record<string, unknown> {
    this.voiceManager.leave(guildId);
    return this.voiceManager.join({ guildId, channelId });
  }
}
