import * as Database from 'better-sqlite3';

import { logger } from '../utils/logger';
import { config } from '../config/env';

export class DatabaseService {
  private readonly db: Database.Database;

  constructor(databaseUrl: string) {
    this.db = new Database.default(databaseUrl);
  }

  initialize(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS server_settings (
        guild_id TEXT PRIMARY KEY,
        prefix TEXT NOT NULL DEFAULT '!',
        default_volume INTEGER NOT NULL DEFAULT 100,
        autoplay INTEGER NOT NULL DEFAULT 0,
        24_7 INTEGER NOT NULL DEFAULT 0,
        language TEXT NOT NULL DEFAULT 'pt-BR',
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    logger.info('SQLite database initialized.');
  }

  getDb(): Database.Database {
    return this.db;
  }

  close(): void {
    this.db.close();
    logger.info('SQLite database closed.');
  }

  getServerSettings(guildId: string): Record<string, unknown> {
    const row = this.db.prepare('SELECT * FROM server_settings WHERE guild_id = ?').get(guildId) as Record<string, unknown> | undefined;

    if (!row) {
      return {
        guild_id: guildId,
        prefix: config.defaultPrefix,
        default_volume: config.defaultVolume,
        autoplay: 0,
        '24_7': 0,
        language: 'pt-BR',
      };
    }

    return row;
  }

  upsertServerSettings(guildId: string, values: Record<string, unknown>): void {
    const sql = `
      INSERT INTO server_settings (guild_id, prefix, default_volume, autoplay, 24_7, language, updated_at)
      VALUES (@guild_id, @prefix, @default_volume, @autoplay, @24_7, @language, CURRENT_TIMESTAMP)
      ON CONFLICT(guild_id) DO UPDATE SET
        prefix = excluded.prefix,
        default_volume = excluded.default_volume,
        autoplay = excluded.autoplay,
        24_7 = excluded.24_7,
        language = excluded.language,
        updated_at = CURRENT_TIMESTAMP;
    `;

    this.db.prepare(sql).run({
      guild_id: guildId,
      prefix: values.prefix ?? config.defaultPrefix,
      default_volume: values.default_volume ?? config.defaultVolume,
      autoplay: values.autoplay ?? 0,
      '24_7': values['24_7'] ?? 0,
      language: values.language ?? 'pt-BR',
    });
  }
}
