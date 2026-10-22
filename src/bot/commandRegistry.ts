import { DatabaseService } from '../database/database';
import { logger } from '../utils/logger';
import { PlayerManager } from '../music/PlayerManager';
import { TrackResolver } from '../music/resolver/TrackResolver';
import { FluxerCommandContext, FluxerCommandDefinition } from '../types/fluxer';
import { Player } from '../music/Player';
import { Track } from '../music/Track';

function formatQueueSummary(player: Player): string {
  const tracks = player.queue.list();

  if (tracks.length === 0) {
    return 'A fila está vazia.';
  }

  return tracks
    .slice(0, 10)
    .map((track, index) => `${index + 1}. ${track.title} — ${track.artist ?? 'Sem artista'}`)
    .join('\n');
}

export function buildCommandRegistry(
  client: {
    getPlayerManager: () => PlayerManager;
    getTrackResolver: () => TrackResolver;
  },
  playerManager: PlayerManager,
  trackResolver: TrackResolver,
): Map<string, FluxerCommandDefinition> {
  const registry = new Map<string, FluxerCommandDefinition>();

  const register = (command: FluxerCommandDefinition): void => {
    registry.set(command.name, command);
  };

  register({
    name: 'play',
    description: 'Entra no canal e adiciona uma música à fila ou inicia a reprodução.',
    async handler(context: FluxerCommandContext): Promise<void> {
      const guildId = context.guildId ?? 'default';
      const player = playerManager.get(guildId);
      const query = context.args.join(' ');

      if (!query) {
        await context.reply('Use: /play <música> ou !play <música>');
        return;
      }

      try {
        const resolved = await trackResolver.resolve(query, context.username ?? 'unknown');
        const track = resolved[0];
        player.addTrack(track);

        if (!player.currentTrack) {
          await player.play(track);
          await context.reply(`🎵 Tocando agora: ${track.title}`);
          return;
        }

        await context.reply(`✅ Adicionada à fila: ${track.title}`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        await context.reply(`⚠️ Não foi possível reproduzir: ${message}`);
      }
    },
  });

  register({
    name: 'search',
    description: 'Busca uma música e retorna a primeira opção.',
    async handler(context: FluxerCommandContext): Promise<void> {
      const query = context.args.join(' ');

      if (!query) {
        await context.reply('Use: /search <música>');
        return;
      }

      try {
        const results = await trackResolver.resolve(query, context.username ?? 'unknown');
        const track = results[0];
        await context.reply(`🔎 Resultado: ${track.title}\nURL: ${track.url}`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        await context.reply(`❌ Busca falhou: ${message}`);
      }
    },
  });

  register({
    name: 'pause',
    description: 'Pausa a reprodução atual.',
    async handler(context: FluxerCommandContext): Promise<void> {
      const player = playerManager.get(context.guildId ?? 'default');
      await player.pause();
      await context.reply('⏸️ Reprodução pausada.');
    },
  });

  register({
    name: 'resume',
    description: 'Retoma a reprodução.',
    async handler(context: FluxerCommandContext): Promise<void> {
      const player = playerManager.get(context.guildId ?? 'default');
      await player.resume();
      await context.reply('▶️ Reprodução retomada.');
    },
  });

  register({
    name: 'skip',
    description: 'Pula para a próxima faixa da fila.',
    async handler(context: FluxerCommandContext): Promise<void> {
      const player = playerManager.get(context.guildId ?? 'default');
      await player.skip();
      const next = player.currentTrack;
      await context.reply(next ? `⏭️ Pulando para: ${next.title}` : '⏭️ Nenhuma música restante na fila.');
    },
  });

  register({
    name: 'stop',
    description: 'Para a reprodução e limpa a faixa atual.',
    async handler(context: FluxerCommandContext): Promise<void> {
      const player = playerManager.get(context.guildId ?? 'default');
      await player.stop();
      await context.reply('⏹️ Reprodução interrompida.');
    },
  });

  register({
    name: 'leave',
    description: 'Sai do canal de voz.',
    async handler(context: FluxerCommandContext): Promise<void> {
      const player = playerManager.get(context.guildId ?? 'default');
      await player.destroy();
      await context.reply('🚪 Saindo do canal de voz.');
    },
  });

  register({
    name: 'queue',
    description: 'Mostra a fila atual.',
    async handler(context: FluxerCommandContext): Promise<void> {
      const player = playerManager.get(context.guildId ?? 'default');
      const summary = formatQueueSummary(player);
      await context.reply(`🎵 Fila\n${summary}`);
    },
  });

  register({
    name: 'nowplaying',
    description: 'Exibe a faixa atual.',
    async handler(context: FluxerCommandContext): Promise<void> {
      const player = playerManager.get(context.guildId ?? 'default');
      const track = player.currentTrack;
      await context.reply(track ? `🎵 Tocando agora: ${track.title}` : '🎵 Nenhuma música está tocando agora.');
    },
  });

  register({
    name: 'volume',
    description: 'Altera o volume do player.',
    async handler(context: FluxerCommandContext): Promise<void> {
      const value = Number(context.args[0] ?? 100);
      const player = playerManager.get(context.guildId ?? 'default');
      player.setVolume(value);
      await context.reply(`🔊 Volume ajustado para ${player.volume}.`);
    },
  });

  register({
    name: 'shuffle',
    description: 'Embaralha a fila.',
    async handler(context: FluxerCommandContext): Promise<void> {
      const player = playerManager.get(context.guildId ?? 'default');
      player.shuffle();
      await context.reply('🔀 Fila embaralhada.');
    },
  });

  register({
    name: 'loop',
    description: 'Alterna o modo de repetição.',
    async handler(context: FluxerCommandContext): Promise<void> {
      const player = playerManager.get(context.guildId ?? 'default');
      const nextMode = player.loopMode === 'NONE' ? 'QUEUE' : 'NONE';
      player.setLoop(nextMode);
      await context.reply(`🔁 Modo de repetição: ${nextMode}.`);
    },
  });

  register({
    name: 'remove',
    description: 'Remove uma faixa da fila.',
    async handler(context: FluxerCommandContext): Promise<void> {
      const index = Number(context.args[0] ?? -1);
      const player = playerManager.get(context.guildId ?? 'default');
      const removed = player.removeTrack(index - 1);
      await context.reply(removed ? `🗑️ Removida: ${removed.title}` : '❌ Índice inválido.');
    },
  });

  register({
    name: 'clear',
    description: 'Limpa a fila.',
    async handler(context: FluxerCommandContext): Promise<void> {
      const player = playerManager.get(context.guildId ?? 'default');
      player.clearQueue();
      await context.reply('🧹 Fila limpa.');
    },
  });

  register({
    name: 'autoplay',
    description: 'Alterna o autoplay.',
    async handler(context: FluxerCommandContext): Promise<void> {
      const player = playerManager.get(context.guildId ?? 'default');
      player.autoplay = !player.autoplay;
      await context.reply(player.autoplay ? '✨ Autoplay ativado.' : '✨ Autoplay desativado.');
    },
  });

  return registry;
}
