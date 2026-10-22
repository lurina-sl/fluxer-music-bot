import { Track } from './Track';

export class Queue {
  private readonly tracks: Track[] = [];
  private readonly maxSize: number;

  constructor(maxSize = 200) {
    this.maxSize = maxSize;
  }

  size(): number {
    return this.tracks.length;
  }

  isEmpty(): boolean {
    return this.tracks.length === 0;
  }

  add(track: Track): void {
    if (this.tracks.length >= this.maxSize) {
      throw new Error('Queue limit reached.');
    }

    this.tracks.push(track);
  }

  addMany(tracks: Track[]): void {
    for (const track of tracks) {
      this.add(track);
    }
  }

  remove(index: number): Track | undefined {
    if (index < 0 || index >= this.tracks.length) {
      return undefined;
    }

    return this.tracks.splice(index, 1)[0];
  }

  clear(): void {
    this.tracks.length = 0;
  }

  move(fromIndex: number, toIndex: number): void {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= this.tracks.length || toIndex >= this.tracks.length) {
      throw new Error('Invalid queue indexes.');
    }

    const [track] = this.tracks.splice(fromIndex, 1);
    this.tracks.splice(toIndex, 0, track);
  }

  shuffle(): void {
    for (let index = this.tracks.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [this.tracks[index], this.tracks[swapIndex]] = [this.tracks[swapIndex], this.tracks[index]];
    }
  }

  peek(index = 0): Track | undefined {
    return this.tracks[index];
  }

  list(): Track[] {
    return [...this.tracks];
  }
}
