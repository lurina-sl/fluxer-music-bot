import * as fs from 'fs';
import * as path from 'path';
import { config } from './config/env';
import { logger } from './utils/logger';

export function ensureRuntimeDirs(): void {
  const dataDir = path.dirname(config.databaseUrl);

  if (!fs.existsSync(dataDir) && dataDir !== '.') {
    fs.mkdirSync(dataDir, { recursive: true });
    logger.info(`Created runtime data directory: ${dataDir}`);
  }
}
