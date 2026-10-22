export type TrackIdentifier = string;

export class Track {
  public readonly id: string;
  public readonly title: string;
  public readonly artist?: string;
  public readonly url: string;
  public readonly durationSeconds?: number;
  public readonly thumbnail?: string;
  public readonly source: 'youtube' | 'soundcloud' | 'direct' | 'unknown';
  public readonly requestedBy?: string;

  constructor(data: {
    id?: string;
    title: string;
    artist?: string;
    url: string;
    durationSeconds?: number;
    thumbnail?: string;
    source?: 'youtube' | 'soundcloud' | 'direct' | 'unknown';
    requestedBy?: string;
  }) {
    this.id = data.id ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    this.title = data.title;
    this.artist = data.artist;
    this.url = data.url;
    this.durationSeconds = data.durationSeconds;
    this.thumbnail = data.thumbnail;
    this.source = data.source ?? 'unknown';
    this.requestedBy = data.requestedBy;
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      title: this.title,
      artist: this.artist,
      url: this.url,
      durationSeconds: this.durationSeconds,
      thumbnail: this.thumbnail,
      source: this.source,
      requestedBy: this.requestedBy,
    };
  }
}
