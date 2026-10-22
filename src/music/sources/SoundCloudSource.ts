import { AudioSource } from './AudioSource';
import { AudioSourceError } from '../../utils/errors';

export class SoundCloudSource extends AudioSource {
  readonly name = 'soundcloud';

  async resolve(query: string): Promise<Array<{ title: string; url: string; thumbnail?: string; durationSeconds?: number; artist?: string; source: 'youtube' | 'soundcloud' | 'direct' | 'unknown'; }>> {
    const value = query.trim();

    if (!value) {
      throw new AudioSourceError('The SoundCloud query cannot be empty.');
    }

    return [{
      title: value,
      url: `https://soundcloud.com/search?q=${encodeURIComponent(value)}`,
      source: 'soundcloud',
    }];
  }
}
