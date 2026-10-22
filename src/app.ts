import { logger } from './utils/logger';
import { config } from './config/env';
import { DatabaseService } from './database/database';
import { FluxerBotClient } from './bot/client';
import { buildCommandRegistry } from './bot/commandRegistry';
import { PlayerManager } from './music/PlayerManager';
import { TrackResolver } from './music/resolver/TrackResolver';

export class App {
  private readonly database: DatabaseService;
  private readonly client: FluxerBotClient;
  private readonly playerManager: PlayerManager;
  private readonly trackResolver: TrackResolver;

  constructor() {
    this.database = new DatabaseService(config.databaseUrl);
    this.playerManager = new PlayerManager();
    this.trackResolver = new TrackResolver();
    this.client = new FluxerBotClient({
      token: config.fluxerBotToken,
      apiUrl: config.fluxerApiUrl,
      gatewayUrl: config.fluxerGatewayUrl,
      defaultPrefix: config.defaultPrefix,
      database: this.database,
      playerManager: this.playerManager,
      trackResolver: this.trackResolver,
    });
  }

  async start(): Promise<void> {
    logger.info('Starting Fluxer Music Bot...');
    logger.info(`Fluxer API: ${config.fluxerApiUrl}`);
    logger.info(`Fluxer Gateway: ${config.fluxerGatewayUrl}`);
    this.database.initialize();

    const registry = buildCommandRegistry(this.client, this.playerManager, this.trackResolver);
    this.client.setCommandRegistry(registry);

    await this.client.connect();
  }

  async stop(): Promise<void> {
    await this.client.disconnect();
    this.database.close();
    logger.info('Fluxer music bot stopped.');
  }
}
