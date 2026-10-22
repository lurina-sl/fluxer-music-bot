import { DatabaseService } from '../database';
import { ServerSettingsRow } from '../models/serverSettings';

export class ServerSettingsRepository {
  constructor(private readonly database: DatabaseService) {}

  get(guildId: string): ServerSettingsRow {
    const row = this.database.getServerSettings(guildId) as ServerSettingsRow;

    return {
      guild_id: row.guild_id,
      prefix: row.prefix,
      default_volume: row.default_volume,
      autoplay: Number(row.autoplay ?? 0),
      '24_7': Number(row['24_7'] ?? 0),
      language: row.language,
    };
  }

  save(guildId: string, patch: Partial<ServerSettingsRow>): void {
    const current = this.get(guildId);

    this.database.upsertServerSettings(guildId, {
      prefix: patch.prefix ?? current.prefix,
      default_volume: patch.default_volume ?? current.default_volume,
      autoplay: patch.autoplay ?? current.autoplay,
      '24_7': patch['24_7'] ?? current['24_7'],
      language: patch.language ?? current.language,
    });
  }
}
