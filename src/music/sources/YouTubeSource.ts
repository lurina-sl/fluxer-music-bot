import { AudioSource } from './AudioSource';
import { AudioSourceError } from '../../utils/errors';

export class YouTubeSource extends AudioSource {
  readonly name = 'youtube';

  async resolve(query: string): Promise<Array<{ title: string; url: string; thumbnail?: string; durationSeconds?: number; artist?: string; source: 'youtube' | 'soundcloud' | 'direct' | 'unknown'; }>> {
    const value = query.trim();

    if (!value) {
      throw new AudioSourceError('The search query cannot be empty.');
    }

    const isDirectUrl = /^https?:\/\//i.test(value);

    return [{
      title: isDirectUrl ? 'YouTube stream' : value,
      url: isDirectUrl ? value : `https://www.youtube.com/results?search_query=${encodeURIComponent(value)}`,
      source: 'youtube',
    }];
  }
}
