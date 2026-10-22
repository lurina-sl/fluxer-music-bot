import { Queue } from './Queue';
import { Track } from './Track';
import { LoopMode, PlayerState } from './types';

export class Player {
  public queue: Queue;
  public currentTrack: Track | null = null;
  public volume = 100;
  public loopMode: LoopMode = 'NONE';
  public autoplay = false;
  public state: PlayerState = 'IDLE';
  public voiceConnection: any = null;
  public playerControls: Record<string, unknown> = {};

  constructor(private readonly guildId: string, maxQueueSize = 200) {
    this.queue = new Queue(maxQueueSize);
  }

  addTrack(track: Track): void {
    this.queue.add(track);
  }

  removeTrack(index: number): Track | undefined {
    return this.queue.remove(index);
  }

  clearQueue(): void {
    this.queue.clear();
  }

  setVolume(value: number): void {
    this.volume = value;
  }

  setLoop(mode: LoopMode): void {
    this.loopMode = mode;
  }

  shuffle(): void {
    this.queue.shuffle();
  }

  async play(track: Track): Promise<void> {
    this.currentTrack = track;
    this.state = 'PLAYING';
  }

  async pause(): Promise<void> {
    this.state = 'PAUSED';
  }

  async resume(): Promise<void> {
    this.state = 'PLAYING';
  }

  async skip(): Promise<void> {
    if (this.queue.size() > 0) {
      this.currentTrack = this.queue.remove(0) ?? null;
    } else {
      this.currentTrack = null;
      this.state = 'IDLE';
    }
  }

  async stop(): Promise<void> {
    this.currentTrack = null;
    this.state = 'STOPPING';
  }

  async destroy(): Promise<void> {
    this.currentTrack = null;
    this.queue.clear();
    this.state = 'DISCONNECTED';
    this.voiceConnection = null;
  }

  get guild(): string {
    return this.guildId;
  }

  get hasCurrentTrack(): boolean {
    return this.currentTrack !== null;
  }
}
