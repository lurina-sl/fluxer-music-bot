import { AudioSource } from '../sources/AudioSource';
import { DirectUrlSource } from '../sources/DirectUrlSource';
import { YouTubeSource } from '../sources/YouTubeSource';
import { Track } from '../Track';

export class TrackResolver {
  private readonly sources: AudioSource[];

  constructor() {
    this.sources = [new YouTubeSource(), new DirectUrlSource()];
  }

  async resolve(query: string, requester?: string): Promise<Track[]> {
    for (const source of this.sources) {
      try {
        const results = await source.resolve(query);

        return results.map((item) => new Track({
          title: item.title,
          url: item.url,
          thumbnail: item.thumbnail,
          durationSeconds: item.durationSeconds,
          artist: item.artist,
          source: item.source,
          requestedBy: requester,
        }));
      } catch {
        // Try the next source if this one cannot resolve the input.
      }
    }

    throw new Error('Unable to resolve the music source for the provided query.');
  }
}
