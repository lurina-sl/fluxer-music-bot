import { logger } from './utils/logger';
import { config } from './config/env';
import { DatabaseService } from './database/database';
import { FluxerBotClient } from './bot/client';
import { buildCommandRegistry } from './bot/commandRegistry';

export class App {
  private readonly database: DatabaseService;
  private readonly client: FluxerBotClient;

  constructor() {
    this.database = new DatabaseService(config.databaseUrl);
    this.client = new FluxerBotClient({
      token: config.fluxerBotToken,
      gatewayUrl: config.fluxerGatewayUrl,
      apiUrl: config.fluxerApiUrl,
      defaultPrefix: config.defaultPrefix,
      logger,
      database: this.database,
    });
  }

  async start(): Promise<void> {
    logger.info('Starting Fluxer Music Bot...');
    logger.info(`Gateway URL: ${config.fluxerGatewayUrl}`);
    logger.info(`API URL: ${config.fluxerApiUrl}`);

    this.database.initialize();

    const registry = buildCommandRegistry(this.client, this.database);
    this.client.setCommandRegistry(registry);

    await this.client.connect();
  }

  async stop(): Promise<void> {
    await this.client.disconnect();
    this.database.close();
    logger.info('Fluxer Music Bot stopped.');
  }
}
