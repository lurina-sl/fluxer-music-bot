import { Player } from './Player';

export class PlayerManager {
  private readonly players = new Map<string, Player>();

  get(guildId: string): Player {
    let player = this.players.get(guildId);

    if (!player) {
      player = new Player(guildId);
      this.players.set(guildId, player);
    }

    return player;
  }

  delete(guildId: string): boolean {
    return this.players.delete(guildId);
  }

  list(): Map<string, Player> {
    return new Map(this.players);
  }
}
