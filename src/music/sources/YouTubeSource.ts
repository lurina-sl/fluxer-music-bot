import { AudioSource } from './AudioSource';
import { AudioSourceError } from '../../utils/errors';

export class YouTubeSource extends AudioSource {
  readonly name = 'youtube';

  async resolve(query: string): Promise<Array<{ title: string; url: string; thumbnail?: string; durationSeconds?: number; artist?: string; source: 'youtube' | 'soundcloud' | 'direct' | 'unknown' }>> {
    const normalized = query.trim();

    if (!normalized) {
      throw new AudioSourceError('Search query cannot be empty.');
    }

    const isDirectUrl = /^https?:\/\//i.test(normalized);

    if (isDirectUrl) {
      return [{
        title: 'YouTube stream',
        url: normalized,
        source: 'youtube',
      }];
    }

    return [{
      title: normalized,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(normalized)}`,
      source: 'youtube',
    }];
  }
}
