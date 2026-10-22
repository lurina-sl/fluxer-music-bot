export abstract class AudioSource {
  abstract readonly name: string;

  abstract async resolve(query: string): Promise<{ title: string; url: string; thumbnail?: string; durationSeconds?: number; artist?: string; source: 'youtube' | 'soundcloud' | 'direct' | 'unknown' }[]>;
}
