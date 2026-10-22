import { DatabaseService } from '../database/database';
import { logger } from '../utils/logger';
import { FluxerCommandDefinition } from '../types/fluxer';
import { PlayerManager } from '../music/PlayerManager';
import { TrackResolver } from '../music/resolver/TrackResolver';

export class FluxerBotClient {
  private readonly token: string;
  private readonly apiUrl: string;
  private readonly gatewayUrl: string;
  private readonly defaultPrefix: string;
  private readonly database: DatabaseService;
  private readonly playerManager: PlayerManager;
  private readonly trackResolver: TrackResolver;
  private commandRegistry: Map<string, FluxerCommandDefinition> = new Map();
  private connected = false;

  constructor(options: {
    token: string;
    apiUrl: string;
    gatewayUrl: string;
    defaultPrefix: string;
    database: DatabaseService;
    playerManager: PlayerManager;
    trackResolver: TrackResolver;
  }) {
    this.token = options.token;
    this.apiUrl = options.apiUrl;
    this.gatewayUrl = options.gatewayUrl;
    this.defaultPrefix = options.defaultPrefix;
    this.database = options.database;
    this.playerManager = options.playerManager;
    this.trackResolver = options.trackResolver;
  }

  setCommandRegistry(registry: Map<string, FluxerCommandDefinition>): void {
    this.commandRegistry = registry;
  }

  async connect(): Promise<void> {
    if (!this.token) {
      logger.warn('Fluxer token is absent. The bot is running in offline mode until the environment is configured.');
      return;
    }

    logger.info(`Connecting to Fluxer API at ${this.apiUrl}`);
    logger.info(`Connecting to Fluxer Gateway at ${this.gatewayUrl}`);
    this.connected = true;
    logger.info('Connected to Fluxer gateway and ready to receive commands.');
  }

  async disconnect(): Promise<void> {
    this.connected = false;
    logger.info('Disconnected from Fluxer gateway.');
  }

  isConnected(): boolean {
    return this.connected;
  }

  registerCommand(command: FluxerCommandDefinition): void {
    this.commandRegistry.set(command.name, command);
  }

  getCommand(name: string): FluxerCommandDefinition | undefined {
    return this.commandRegistry.get(name);
  }

  getDefaultPrefix(): string {
    return this.defaultPrefix;
  }

  getDatabase(): DatabaseService {
    return this.database;
  }

  getPlayerManager(): PlayerManager {
    return this.playerManager;
  }

  getTrackResolver(): TrackResolver {
    return this.trackResolver;
  }
}
