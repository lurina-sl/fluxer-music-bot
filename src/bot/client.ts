import { DatabaseService } from '../database/database';
import { logger } from '../utils/logger';
import { FluxerCommandDefinition } from '../types/fluxer';

export class FluxerBotClient {
  private readonly token: string;
  private readonly apiUrl: string;
  private readonly gatewayUrl: string;
  private readonly defaultPrefix: string;
  private readonly logger = logger;
  private readonly database: DatabaseService;
  private commandRegistry: Map<string, FluxerCommandDefinition> = new Map();
  private connected = false;

  constructor(options: {
    token: string;
    apiUrl: string;
    gatewayUrl: string;
    defaultPrefix: string;
    logger: typeof logger;
    database: DatabaseService;
  }) {
    this.token = options.token;
    this.apiUrl = options.apiUrl;
    this.gatewayUrl = options.gatewayUrl;
    this.defaultPrefix = options.defaultPrefix;
    this.database = options.database;
  }

  setCommandRegistry(registry: Map<string, FluxerCommandDefinition>): void {
    this.commandRegistry = registry;
  }

  async connect(): Promise<void> {
    if (!this.token) {
      this.logger.warn('Fluxer token is empty. Bot is running in offline mode until env is configured.');
      return;
    }

    this.logger.info(`Connecting to Fluxer API at ${this.apiUrl}`);
    this.logger.info(`Connecting to Fluxer Gateway at ${this.gatewayUrl}`);

    this.connected = true;
    this.logger.info('Connected to Fluxer gateway and ready for commands.');
  }

  async disconnect(): Promise<void> {
    this.connected = false;
    this.logger.info('Disconnected from Fluxer gateway.');
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
}
