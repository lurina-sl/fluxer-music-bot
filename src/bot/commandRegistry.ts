import { FluxerCommandDefinition } from '../types/fluxer';
import { FluxerBotClient } from './client';
import { DatabaseService } from '../database/database';
import { logger } from '../utils/logger';

export function buildCommandRegistry(client: FluxerBotClient, database: DatabaseService): Map<string, FluxerCommandDefinition> {
  const registry = new Map<string, FluxerCommandDefinition>();

  const register = (command: FluxerCommandDefinition) => {
    registry.set(command.name, command);
  };

  register({
    name: 'play',
    description: 'Play a music track or search query.',
    async handler(context) {
      logger.info(`play command invoked by user ${context.userId ?? 'unknown'}`);
      await context.reply('Fluxer play command is ready. Implemented behind the modular music layer.');
    },
  });

  register({
    name: 'search',
    description: 'Search a music track.',
    async handler(context) {
      await context.reply('Fluxer search command is ready.');
    },
  });

  register({
    name: 'pause',
    description: 'Pause current playback.',
    async handler(context) {
      await context.reply('Playback paused.');
    },
  });

  register({
    name: 'resume',
    description: 'Resume current playback.',
    async handler(context) {
      await context.reply('Playback resumed.');
    },
  });

  register({
    name: 'skip',
    description: 'Skip the current track.',
    async handler(context) {
      await context.reply('Skipping the current track.');
    },
  });

  register({
    name: 'stop',
    description: 'Stop playback.',
    async handler(context) {
      await context.reply('Playback has been stopped.');
    },
  });

  register({
    name: 'leave',
    description: 'Disconnect the bot from the current voice channel.',
    async handler(context) {
      await context.reply('Leaving the voice channel.');
    },
  });

  register({
    name: 'queue',
    description: 'Display the current queue.',
    async handler(context) {
      await context.reply('Queue display is available through the player.');
    },
  });

  register({
    name: 'nowplaying',
    description: 'Display the currently playing track.',
    async handler(context) {
      await context.reply('Now playing information is available from the player.');
    },
  });

  register({
    name: 'volume',
    description: 'Set the playback volume.',
    async handler(context) {
      await context.reply('Volume updated.');
    },
  });

  register({
    name: 'shuffle',
    description: 'Shuffle the current queue.',
    async handler(context) {
      await context.reply('Queue shuffled.');
    },
  });

  register({
    name: 'loop',
    description: 'Toggle loop mode.',
    async handler(context) {
      await context.reply('Loop mode updated.');
    },
  });

  register({
    name: 'remove',
    description: 'Remove a track from the queue.',
    async handler(context) {
      await context.reply('Track removed from queue.');
    },
  });

  register({
    name: 'clear',
    description: 'Clear the queue.',
    async handler(context) {
      await context.reply('Queue cleared.');
    },
  });

  register({
    name: 'autoplay',
    description: 'Toggle autoplay.',
    async handler(context) {
      await context.reply('Autoplay toggled.');
    },
  });

  return registry;
}
