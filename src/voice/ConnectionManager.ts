import { VoiceManager } from './VoiceManager';

export class ConnectionManager {
  private readonly voiceManager: VoiceManager;

  constructor() {
    this.voiceManager = new VoiceManager();
  }

  async joinVoiceChannel(guildId: string, channelId: string): Promise<any> {
    return this.voiceManager.join({ guildId, channelId });
  }

  async leaveVoiceChannel(guildId: string): Promise<void> {
    this.voiceManager.leave(guildId);
  }
}
