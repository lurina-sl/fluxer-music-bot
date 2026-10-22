export abstract class AudioSource {
  abstract readonly name: string;

  abstract resolve(query: string): Promise<Array<{
    title: string;
    url: string;
    thumbnail?: string;
    durationSeconds?: number;
    artist?: string;
    source: 'youtube' | 'soundcloud' | 'direct' | 'unknown';
  }>>;
}
