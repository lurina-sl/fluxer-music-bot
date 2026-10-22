import { AudioSource } from './AudioSource';
import { AudioSourceError } from '../../utils/errors';

export class DirectUrlSource extends AudioSource {
  readonly name = 'direct';

  async resolve(query: string): Promise<Array<{ title: string; url: string; thumbnail?: string; durationSeconds?: number; artist?: string; source: 'youtube' | 'soundcloud' | 'direct' | 'unknown'; }>> {
    try {
      const url = new URL(query);
      return [{
        title: 'Direct audio stream',
        url: url.toString(),
        source: 'direct',
      }];
    } catch {
      throw new AudioSourceError('The value is not a valid direct URL.');
    }
  }
}
